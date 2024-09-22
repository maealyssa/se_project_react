import "../blocks/ClothesSection.css";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";

function ClothesSection({ handleCardClick }) {
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p>Your Items</p>
                <button className="clothes-section__header_button">+ Add New</button>
            </div>
            <ul className="clothes-section__list">
                    {defaultClothingItems
                    .map((item) => {
                        return (
                            <ItemCard 
                                key={item._id} 
                                item={item}
                                onCardClick={handleCardClick}
                            />
                        );
                    })}
                </ul>
        </div>
    )
}

export default ClothesSection;