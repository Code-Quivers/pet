import AdFormSection from "@/components/AdSection/form/AdForm";
import AdTableSection from "@/components/AdSection/table/AdTable";

const AdSectionPage = () => {
    return (
        <div>
            <div>
            <AdFormSection/>
            </div>
            <div>
                <AdTableSection/>
            </div>
        </div>
    );
};

export default AdSectionPage;