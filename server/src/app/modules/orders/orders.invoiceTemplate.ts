/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateHtmlForInvoice = (order: any): string => {
  console.log(order, "order");
  return `
    <html>
      <head>
        <style>
         body {
    font-family: "Poppins", sans-serif;
}

p,
h1,
h2,
h4 {
    margin: 0px;
    font-weight: 400;

}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    min-height: 100vh;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header h1 {
    font-weight: 600;
}

.greeting h4 {
    font-weight: 500;
}

.order-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin: 20px 0;
    border-top: 1px solid #ddd;
    padding-top: 15px;
}

.info-item {
    /*     margin-bottom: 10px; */
}

.label {
    color: gray;
}

.value {
    font-weight: 500;
}

.order-items-header {
    display: grid;
    grid-template-columns: 6fr 2fr 2fr 2fr;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.order-items-header h2 {
    font-weight: 600;
    font-size: 18px;
}

.amount {
    text-align: right;
}

.order-items {
    border-bottom: 1px solid #ddd;
}

.order-item {
    display: grid;
    grid-template-columns: 6fr 2fr 2fr 2fr;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
}

.item-amount {
    text-align: right;
}

.product-name {
    font-weight: 600;
}

.order-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 15px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}

.total {
    font-weight: bold;
}
        </style>
      </head>
      <body>
    <div class="container">
        <div class="header">
            <h1>Your Order Confirmed</h1>
        </div>

        <div class="greeting">
            <h4>Hello ${order?.deliveryInfo?.firstName},</h4>
            <p>Your order has been confirmed. You will receive an email with your order details.</p>
        </div>

        <div class="order-info">
            <div class="info-item">
                <p class="label">Order Date</p>
                <p class="value">12 Jan, 2024</p>
            </div>
            <div class="info-item">
                <p class="label">Order No</p>
                <p class="value">${order?.paymentPlatformId}</p>
            </div>
            <div class="info-item">
                <p class="label">Payment</p>
                <p class="value">${order?.paymentPlatform}</p>
            </div>
            <div class="info-item">
                <p class="label">Shipping Address</p>
                <p class="value">600 Montogo St, San Francisco, CA 94103</p>
            </div>
        </div>

        <div class="order-items-header">
            <h2>Item</h2>
            <h2>Quantity</h2>
            <h2>Price</h2>
            <h2 class="amount">Amount</h2>
        </div>

        <div class="order-items">
        ${order?.cartItems?.map((item: any) => (
          `
          <div class="order-item">
                <div class="item-name">
                    <p class="product-name">${item?.productName}</p>
                    <p>Color: ${item?.color?.name}</p>
                </div>
                <div class="item-quantity">${item?.quantity}</div>
                <div class="item-price">${item?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}</div>
                <div class="item-amount">${item?.totalPrice?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}</div>
            </div>`
        )).join('')}
            
         
        </div>

        <div class="order-summary">
            <div> </div>
            <div>
                <div class="summary-item">
                    <p>Subtotal</p>
                    <p>${order?.subTotal?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                </div>
                <div class="summary-item">
                    <p>Tax</p>
                     <p>${order?.tax?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                </div>
                <div class="summary-item total">
                    <p>Total</p>
                   <p>${order?.paymentInfo?.amountPaid?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                </div>
            </div>
        </div>

        
    </div>
</body>
    </html>
  `;
};
