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
      // Adjust the data structure to match the expected format by Strapi
      const response = await axios.post('http://38.242.197.100:1337/api/quotes', {
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

  return (
    <div>
      <div className="contact-form-right-warp">
        <div className="postbox__comment-form">
          <form className="box" onSubmit={handleSubmit(onSubmit)}>
            <div className="row gx-20">
              <div className="col-12">
                <div className="postbox__comment-input mb-30">
                  <input
                    type="number"
                    className="inputText"
                    {...register('quantity', { required: 'Quantity is required' })}
                  />
                  <span className="floating-label">Quantity</span>
                  {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
                </div>
              </div>
              <div className="col-12">
                <div className="postbox__comment-input mb-30">
                  <input
                    type="text"
                    className="inputText"
                    {...register('name', { required: 'Name is required' })}
                  />
                  <span className="floating-label">Name</span>
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
              </div>
              <div className="col-12">
                <div className="postbox__comment-input mb-30">
                  <input
                    type="text"
                    className="inputText"
                    {...register('company', { required: 'Company is required' })}
                  />
                  <span className="floating-label">Company</span>
                  {errors.company && <p className="text-red-500">{errors.company.message}</p>}
                </div>
              </div>
              <div className="col-12">
                <div className="postbox__comment-input mb-35">
                  <input
                    type="tel"
                    className="inputText"
                    {...register('phone', { 
                      required: 'Phone is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                  />
                  <span className="floating-label">Phone</span>
                  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="col-12">
                <div className="postbox__comment-input mb-30">
                  <input
                    type="email"
                    className="inputText"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <span className="floating-label">Email</span>
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
              </div>
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
            <p className="text-green-500">Form submitted successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500">Error submitting form. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
