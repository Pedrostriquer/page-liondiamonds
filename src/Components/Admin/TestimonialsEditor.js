import React from 'react';

const TestimonialEditor = ({ testimonial, index, handleDynamicImageUpload, handleTestimonialChange, handleRemoveTestimonial }) => (
    <div className="testimonial-editor">
        <h4>Depoimento {index + 1}</h4>
        <div className="testimonial-image-preview">
            <img src={testimonial.imageSrc} alt={`Depoimento ${index + 1}`} />
        </div>
        <label>
            Trocar Foto:
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleDynamicImageUpload(e.target.files[0], 'testimonial', index)}
            />
        </label>
        <label>
            Comentário:
            <textarea
                value={testimonial.comment}
                onChange={(e) => handleTestimonialChange(e, index, 'comment')}
                rows="4"
            ></textarea>
        </label>
        <label>
            Autor:
            <input
                type="text"
                value={testimonial.author}
                onChange={(e) => handleTestimonialChange(e, index, 'author')}
            />
        </label>
        <button onClick={() => handleRemoveTestimonial(index)} className="remove-item-button">Remover Depoimento</button>
    </div>
);

const TestimonialsEditor = ({
    localClientsTestimonials,
    handleDynamicImageUpload,
    handleTestimonialChange,
    handleRemoveTestimonial,
    handleAddTestimonial,
    handleSaveTestimonials
}) => {
    return (
        <section>
            <h3>Depoimentos de Clientes</h3>
            <div className="testimonial-editor-grid">
                {localClientsTestimonials.map((testimonial, index) => (
                    <TestimonialEditor
                        key={testimonial.id}
                        testimonial={testimonial}
                        index={index}
                        handleDynamicImageUpload={handleDynamicImageUpload}
                        handleTestimonialChange={handleTestimonialChange}
                        handleRemoveTestimonial={handleRemoveTestimonial}
                    />
                ))}
            </div>
            <button onClick={handleAddTestimonial} className="add-testimonial-button">Adicionar Depoimento</button>
            <button onClick={handleSaveTestimonials} className="save-testimonials-button">Salvar Depoimentos</button>
        </section>
    );
};

export default TestimonialsEditor;