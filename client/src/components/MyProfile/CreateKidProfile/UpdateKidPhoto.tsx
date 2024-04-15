import { useState } from "react";
import { Message, Uploader, useToaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import Image from "next/image";
import { fileUrlKey } from "@/helpers/config/envConfig";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface StyleImageUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
  defaultImage: string;
}

const UpdateKidPhoto = ({ field, defaultImage }: StyleImageUploadProps) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const toaster = useToaster();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    (!fileValue?.length && `${fileUrlKey()}/${defaultImage}`) || undefined
  );

  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 5 * 1024 * 1024; // 5 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit &&
        latestFile.blobFile?.type.startsWith("image/")
      ) {
        setFileValue([latestFile]);

        field.onChange(latestFile);

        const file = latestFile;
        const reader = new FileReader();

        reader.onload = (e) => {
          const imagePreviewUrl = e.target?.result as string;
          setImagePreview(imagePreviewUrl);
        };

        reader.readAsDataURL(file.blobFile as File);
      } else {
        clearImagePreview();
        toaster.push(
          <Message bordered showIcon type="error" closable>
            <h4 className="font-semibold ">
              Image should be less than 5 MB and must be in image format
            </h4>
          </Message>,
          { placement: "topEnd", duration: 2000 }
        );
      }
    } else {
      clearImagePreview();
    }
  };

  const clearImagePreview = () => {
    setImagePreview(`${fileUrlKey()}/${defaultImage}`);
    field.onChange(undefined);
    setFileValue([]);
  };

  return (
    <div className="relative group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        onRemove={clearImagePreview}
        className="w-full"
        accept="image/*"
      >
        {imagePreview ? (
          <Image
            width={300}
            height={300}
            src={imagePreview}
            alt="Image Preview"
            className="w-full md:w-full rounded-full h-full object-cover object-center cursor-pointer"
          />
        ) : (
          <span className="text-xs flex justify-center flex-col items-center gap-2 text-center font-semibold text-black/60">
            <AiOutlineCloudUpload size={40} />
            Upload
          </span>
        )}
      </Uploader>
    </div>
  );
};

export default UpdateKidPhoto;
