/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateHtmlForInvoice = (order: any): string => {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { text-align: center; }
          .details { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invoice</h1>
          <h3>Order ID: ${order?.orderId}</h3>
          <div class="details">
            <p><strong>Customer Name:</strong> ${order?.customerName}</p>
            <p><strong>Total Amount:</strong> ${order?.totalAmount}</p>
            <p><strong>Date:</strong> 32</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              
                <tr>
                  <td>item.name</td>
                  <td>item.quantity}</td>
                  <td>$item.price</td>
                </tr>
            </tbody>
          </table>
          <p><strong>Total:</strong> 50</p>
        </div>
      </body>
    </html>
  `;
};
