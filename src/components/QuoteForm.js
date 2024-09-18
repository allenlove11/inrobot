import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const QuoteForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/quotes`, {
        data: {
          Quantity: formData.quantity,
          Name: formData.name,
          Company: formData.company,
          Phone: formData.phone,
          Email: formData.email
        }
      });
      console.log(response.data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' }
  ];

  return (
    <div className="contact-form-right-warp">
      <div className="postbox__comment-form">
        <form className="box" onSubmit={handleSubmit(onSubmit)}>
          <div className="row gx-20">
            {inputFields.map((field) => (
              <div className="col-12" key={field.name}>
                <div className="postbox__comment-input mb-30">
                  <input
                    type={field.type}
                    className="inputText"
                    {...register(field.name, {
                      required: `${field.label} is required`,
                      ...(field.name === 'email' && {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      }),
                      ...(field.name === 'phone' && {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Please enter a valid phone number'
                        }
                      })
                    })}
                  />
                  <span className="floating-label">{field.label}</span>
                  {errors[field.name] && <p className="text-red-500">{errors[field.name].message}</p>}
                </div>
              </div>
            ))}
            <div className="col-12">
              <p className="text-sm text-gray-600">
                For more information on how your data is processed and stored by EU Automation please read our privacy policy.
              </p>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__btn-box">
                <button 
                  className="submit-btn w-100" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get a Quote'}
                </button>
              </div>
            </div>
          </div>
        </form>
        {submitStatus === 'success' && (
          <p className="text-green-500 mt-4">Form submitted successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 mt-4">An error occurred. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;
