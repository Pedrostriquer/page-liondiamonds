import React from 'react';

// Este componente interno é usado apenas aqui, então pode ficar no mesmo arquivo.
const NavTextSection = ({ item, index, handleTitleChange, handleIndividualDropdownItemChange, handleRemoveDropdownItem, handleAddDropdownItem, handleRemoveNavItem }) => (
    <div className="nav-text-section">
        <label>Título:
            <input
                type="text"
                value={item.title}
                onChange={(e) => handleTitleChange(e, index)}
            />
        </label>
        {item.dropdown && (
            <>
                <p className="dropdown-label">Itens do Dropdown:</p>
                <div className="dropdown-items-list">
                    {item.dropdown.map((dropdownItem, dIndex) => (
                        <div key={dropdownItem.id} className="dropdown-item-row">
                            <input
                                type="text"
                                value={dropdownItem.text}
                                onChange={(e) => handleIndividualDropdownItemChange(e, index, dIndex)}
                            />
                            <button onClick={() => handleRemoveDropdownItem(index, dIndex)} className="remove-item-button">Remover</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleAddDropdownItem(index)} className="add-item-button">Adicionar Item</button>
            </>
        )}
        <button onClick={() => handleRemoveNavItem(index)} className="remove-nav-item-button">Remover Botão do Menu</button>
    </div>
);


const HeaderEditor = ({
    localNavData,
    handleTitleChange,
    handleIndividualDropdownItemChange,
    handleRemoveDropdownItem,
    handleAddDropdownItem,
    handleAddNavItem,
    handleRemoveNavItem,
    handleSaveNavText
}) => {
    return (
        <section>
            <h3>Textos do Header</h3>
            <div className="header-editor-controls">
                <button onClick={handleAddNavItem} className="add-nav-item-button">Adicionar Novo Botão ao Menu</button>
            </div>
            <div className="header-text-editor">
                {localNavData.map((item, index) => (
                    <NavTextSection
                        key={item.id}
                        item={item}
                        index={index}
                        handleTitleChange={handleTitleChange}
                        handleIndividualDropdownItemChange={handleIndividualDropdownItemChange}
                        handleRemoveDropdownItem={handleRemoveDropdownItem}
                        handleAddDropdownItem={handleAddDropdownItem}
                        handleRemoveNavItem={handleRemoveNavItem}
                    />
                ))}
            </div>
            <button onClick={handleSaveNavText} className="save-nav-button">Salvar Textos de Navegação</button>
        </section>
    );
};

export default HeaderEditor;