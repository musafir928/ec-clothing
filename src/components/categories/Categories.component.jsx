import DirectoryItem from '../directory-item/directory-item.component';
import './categories.styles.scss';

const Categories = ({ categories }) => {
    return (
        <div className='categories-container'>
            {categories.map((category) => (
                <DirectoryItem category={category} key={category.id} />
            ))}
        </div>
    );
};

export default Categories;
