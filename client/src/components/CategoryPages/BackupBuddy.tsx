import Image from "next/image";
import { fileUrlKey, getBaseUrl } from "@/helpers/config/envConfig";
import TotalControl from "@/components/HomePage/TotalControl";
import ConnectYourWay from "@/components/HomePage/ConnectYourWay";
import BackupBuddySpecs from "@/components/HomePage/BackupBuddySpecs";
import UnrivalledDesign from "./UnrivalledDesign";
import Empowerment from "./Empowerment";
import AlwaysAdventure from "./AlwaysAdventure";
import AgeAppropriate from "./AgeAppropriate";

const BackupBuddy = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <>
        <div className="flex flex-col justify-center items-center px-4 bg-[#F5F5F7] py-20">
          <span className="inline-block mb-4 text-sm md:text-3xl font-semibold leading-none text-primary capitalize  ">
            Revolutionizing Child Safety
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-7xl text-center">
            One Easy Tap, <br /> Infinite Connection Options
          </h2>
        </div>
        <div className="text-center px-4 py-24">
          <h2 className="text-2xl font-bold tracking-tight   max-w-3xl leading-9 mx-auto">
            The easiest safety product on the market, Backup Buddy bands are the
            ultimate safety accessory for kids aged 3-11. Tap the band to any
            smart phone to instantly connect with contacts.
          </h2>
          <h2 className="mb-2 text-xl font-bold tracking-tight max-w-3xl leading-9 mx-auto">
            No Subscriptions or ongoing payments, No apps, No charging ever, No
            Hacking & Tracking Risks, No EMFs.
          </h2>
          <p className="mb-6 text-lg font-medium tracking-tight text-gray-900   max-w-3xl leading-9 mx-auto">
            No more lost moments or heart-pounding searches.
          </p>

          <h5 className="mb-6 text-gray-500 text-2xl font-semibold leading-tight tracking-tight   ">
            Price: $79 including Free Shipping
          </h5>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg">
            Buy
          </button>
        </div>
        {/*  */}
        <div className="pb-20  ">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="w-full md:w-1/2 md:mb-0 mb-8">
              <div className="relative  md:mr-0 w-full">
                <div className="relative overflow-hidden rounded-7xl">
                  <img
                    src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                    alt=""
                    className="relative z-10 object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:mb-0 mb-8">
              <div className="relative  md:mr-0 w-full">
                <div className="relative overflow-hidden rounded-7xl">
                  <img
                    src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                    alt=""
                    className="relative z-10 object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
            Tap or Scan. Anytime, Anywhere
          </h2>
          <p className="mb-3 text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto pt-4 pb-2 text-center">
            Security and connection on their wrist, whether they are across the
            street or across the world - an easy tap or scan bridges the gap,
            ensuring you’re there when they need you.
          </p>
          <p className="text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto   text-center">
            The dual functionality of NFC & QR code technology makes it
            compatible with all smartphones.
          </p>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 pb-10 text-center">
            Unlimited profile contacts controlled by you, accessed by them as
            needed; this is a buddy that {`won't`} let you down
          </p>
          <img
            src="https://i.ibb.co/qr3vnph/share-airtag-cg30tsedr8pe-large.jpg"
            alt=""
          />
        </div>
        {/* Age Appropriate Safety is Just a Tap Away */}
        <AgeAppropriate />
        {/* Age Appropriate Safety is Just a Tap Away */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6">
            More Color. More Adventure. More Safety.
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-4xl leading-8 mx-auto pt-4 text-center">
            Fashion Meets Function. From vibrant colors to sleek lightweight
            designs, our durable bands seamlessly blend fashion and
            functionality. Your child will love wearing their safety accessory
            as much as you’ll love their added protection. Eye catching style
            that speaks safety.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        <div>
          {/* Unrivalled design */}
          <UnrivalledDesign />
          {/* Unrivalled design */}

          {/* Empowerment Through Frictionless Technology */}
          <Empowerment />
          {/* Empowerment Through Frictionless Technology */}

          {/* Always Adventure Ready. How Does It Work? */}
          <AlwaysAdventure />
          {/* Always Adventure Ready. How Does It Work? */}
        </div>

        {/*      Privacy Matters. You're in Control         */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6 text-center">
            Privacy Matters. {`You're`} in Control
          </h2>
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            Our bands give you the power to control what’s shared. You decide
            what contact information is displayed and when it is kept private.
            Safeguarding your data in {`today's`} digital world. If lost, simply
            activate private mode to shield all information. Your profile is
            only accessible with a tap or scan from your unique band and is not
            searchable on the web.
          </p>
          <button className="bg-primary px-4 py-1 rounded-full text-white font-semibold hover:shadow-lg mb-10">
            Buy
          </button>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        {/*       What's In The Box         */}
        <div className="flex flex-col justify-center items-center px-4  py-20">
          <span className="inline-block mb-4 text-sm leading-none text-primary capitalize   border p-2 rounded-full border-primary">
            Access
          </span>
          <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-6xl pt-6 text-center">
            {`What's`} In The Box
          </h2>
          <ul className="list-decimal list-inside mb-6 text-xl font-semibold tracking-tight text-gray-500  space-y-5 max-w-5xl leading-8 mx-auto pt-4  ">
            <li>
              <span className="font-extrabold">Backup Buddy Band:</span> The
              E.T. Phone Home Band, your {`child's`} new safety companion.
              Simply tap or scan to set up your profile.
            </li>
            <li>
              <span className="font-extrabold">Mini Backpack Keychain:</span> A
              convenient and stylish keychain that serves as a portable storage
              solution for your {`child's`} E.T. Phone Home Band. Attach it to a
              backpack, belt loop, or keyring for easy access whenever needed.
            </li>
            <li>
              <span className="font-extrabold"> Mystery {`"Magic"`} Gift:</span>{" "}
              A special surprise gift that adds an element of excitement to
              unboxing the E.T. Phone Home Band. This mystery gift is designed
              to delight and engage your child, making the unboxing experience
              even more memorable.
            </li>
          </ul>{" "}
          <p className="mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center">
            With these items, your child is ready to embark on a safe and fun
            adventure, knowing that help is just a tap away with the E.T. Phone
            Home Band.
          </p>
          <img
            src="https://i.ibb.co/VMJvtJB/accessories-d028mzwnd0a6-large.jpg"
            alt=""
            className="w-full"
          />
        </div>
        <BackupBuddySpecs />
      </>
    </div>
  );
};

export default BackupBuddy;
