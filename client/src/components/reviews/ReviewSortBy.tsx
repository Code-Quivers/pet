import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { IoOptionsOutline } from "react-icons/io5";
import { Dropdown, Popover, Whisper } from "rsuite";

const ReviewSortBy = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleSelect = (eventKey: any) => {
    setSelectedItem(eventKey);
  };

  return (
    <div>
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={(props: any, ref: any) =>
          renderMenu(props, ref, handleSelect, selectedItem)
        }
      >
        <button className="flex justify-center items-center border rounded-lg p-1 hover:bg-[#f4f4f4]">
          <IoOptionsOutline size={35} />
        </button>
      </Whisper>
    </div>
  );
};

export default ReviewSortBy;

const renderMenu = (
  { onClose, left, top, className }: any,
  ref: any,
  handleSelect: (eventKey: any) => void,
  selectedItem: number | null
) => {
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu
        style={{
          padding: 10,
          width: 220,
        }}
        onSelect={(eventKey: any) => {
          handleSelect(eventKey);
          onClose();
        }}
      >
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <strong className="text-lg">Sort By</strong>
        </Dropdown.Item>

        {[
          "Featured",
          "Newest",
          "Highest Ratings",
          "Lowest Ratings",
          "Oldest",
        ].map((label, index) => (
          <Dropdown.Item
            key={index}
            className="hover:!bg-[#f4f4f4] transition-all duration-300"
            eventKey={index}
            style={{
              backgroundColor: selectedItem === index ? "#d7f7ef" : "",
              fontWeight: selectedItem === index ? "bold" : "",
            }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-base font-mono">{label}</h2>
              {selectedItem === index && (
                <span className="mb-0.5">
                  <GiCheckMark />
                </span>
              )}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Popover>
  );
};
