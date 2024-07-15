import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    experience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setForm({
        ...form,
        additionalSkills: [...form.additionalSkills, value]
      });
    } else {
      setForm({
        ...form,
        additionalSkills: form.additionalSkills.filter(skill => skill !== value)
      });
    }
  };

  const validate = () => {
    const errors = {};

    if (!form.fullName) errors.fullName = 'Full Name is required';
    if (!form.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email is invalid';
    if (!form.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    else if (!/^\d+$/.test(form.phoneNumber)) errors.phoneNumber = 'Phone Number must be a valid number';

    if (['Developer', 'Designer'].includes(form.position)) {
      if (!form.experience) errors.experience = 'Relevant Experience is required';
      else if (isNaN(form.experience) || form.experience <= 0) errors.experience = 'Experience must be a number greater than 0';
    }

    if (form.position === 'Designer' && !form.portfolioURL) {
      if (!/^https?:\/\/\S+\.\S+$/.test(form.portfolioURL)) errors.portfolioURL = 'Portfolio URL is invalid';
    }

    if (form.position === 'Manager' && !form.managementExperience) errors.managementExperience = 'Management Experience is required';

    if (form.additionalSkills.length === 0) errors.additionalSkills = 'At least one skill must be selected';

    if (!form.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';

    return errors;
  };

  const handleSubmit = (e) => {
      e.preventDefault();
    const formDataSet = e.target;  
      const sheetData = new FormData(formDataSet);
      //   console.log(formDataSet);
      fetch(
      "https://script.google.com/macros/s/AKfycbxWE_tamHcr_g-3tw0hof9NZLhRp-5sREU3axQaouxPEEdNkL_bqePt0tTmn1WD2Kyp/exec",
      {
        method: "POST",
        body: sheetData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // setForm({
    // fullName: '',
    // email: '',
    // phoneNumber: '',
    // position: '',
    // experience: '',
    // portfolioURL: '',
    // managementExperience: '',
    // additionalSkills: [],
    // preferredInterviewTime: ''
    // })

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmitted(true);
      setErrors({});
      }
      
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto p-2 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Application Summary</h2>
        <p><strong>Full Name:</strong> {form.fullName}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Phone Number:</strong> {form.phoneNumber}</p>
        <p><strong>Applying for Position:</strong> {form.position}</p>
        {['Developer', 'Designer'].includes(form.position) && (
          <p><strong>Relevant Experience (years):</strong> {form.experience}</p>
        )}
        {form.position === 'Designer' && (
          <p><strong>Portfolio URL:</strong> {form.portfolioURL}</p>
        )}
        {form.position === 'Manager' && (
          <p><strong>Management Experience:</strong> {form.managementExperience}</p>
        )}
        <p><strong>Additional Skills:</strong> {form.additionalSkills.join(', ')}</p>
        <p><strong>Preferred Interview Time:</strong> {form.preferredInterviewTime}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white border-2 shadow-md rounded-xl">
      <div className="mb-4">
        <label className="block font-bold text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-bold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-bold text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-bold text-gray-700">Applying for Position</label>
        <select
          name="position"
          value={form.position}
          onChange={handleChange}
          className="mt-1 p-1 block w-full border border-gray-300 rounded-md"
        >
          <option value="" className=''>Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {(form.position === 'Developer' || form.position === 'Designer') && (
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Relevant Experience (years)</label>
          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="mt-1 block  w-full border border-gray-300 rounded-md"
          />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
        </div>
      )}

      {form.position === 'Designer' && (
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Portfolio URL</label>
          <input
            type="text"
            name="portfolioURL"
            value={form.portfolioURL}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
          {errors.portfolioURL && <p className="text-red-500 text-sm">{errors.portfolioURL}</p>}
        </div>
      )}

      {form.position === 'Manager' && (
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Management Experience</label>
          <textarea
            name="managementExperience"
            value={form.managementExperience}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
          {errors.managementExperience && <p className="text-red-500 text-sm">{errors.managementExperience}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="block font-bold text-gray-700">Additional Skills</label>
        <div className="mt-1">
          {['JavaScript', 'CSS', 'Python'].map(skill => (
            <div key={skill} className="flex items-center mb-2">
              <input
                type="checkbox"
                name="additionalSkills"
                value={skill}
                checked={form.additionalSkills.includes(skill)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600"
              />
              <label className="ml-2 text-gray-700">{skill}</label>
            </div>
          ))}
        </div>
        {errors.additionalSkills && <p className="text-red-500 text-sm">{errors.additionalSkills}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-bold text-gray-700">Preferred Interview Time</label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={form.preferredInterviewTime}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
        {errors.preferredInterviewTime && <p className="text-red-500 text-sm">{errors.preferredInterviewTime}</p>}
      </div>

      <div className="mb-4">
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md">
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
