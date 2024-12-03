import "../blocks/ClothesSection.css";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button
          className="clothes-section__header_button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems &&
          clothingItems.map((item) => {
            if (item.owner === currentUser._id) {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            }
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
