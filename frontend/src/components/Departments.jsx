// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const Departments = () => {
//   const departmentsArray = [
//     {
//       name: "Pediatrics",
//       imageUrl: "/departments/pedia.jpg",
//     },
//     {
//       name: "Orthopedics",
//       imageUrl: "/departments/ortho.jpg",
//     },
//     {
//       name: "Cardiology",
//       imageUrl: "/departments/cardio.jpg",
//     },
//     {
//       name: "Neurology",
//       imageUrl: "/departments/neuro.jpg",
//     },
//     {
//       name: "Oncology",
//       imageUrl: "/departments/onco.jpg",
//     },
//     {
//       name: "Radiology",
//       imageUrl: "/departments/radio.jpg",
//     },
//     {
//       name: "Physical Therapy",
//       imageUrl: "/departments/therapy.jpg",
//     },
//     {
//       name: "Dermatology",
//       imageUrl: "/departments/derma.jpg",
//     },
//     {
//       name: "ENT",
//       imageUrl: "/departments/ent.jpg",
//     },
//   ];

//   const responsive = {
//     extraLarge: {
//       breakpoint: { max: 3000, min: 1324 },
//       items: 4,
//       slidesToSlide: 1, // optional, default to 1.
//     },
//     large: {
//       breakpoint: { max: 1324, min: 1005 },
//       items: 3,
//       slidesToSlide: 1, // optional, default to 1.
//     },
//     medium: {
//       breakpoint: { max: 1005, min: 700 },
//       items: 2,
//       slidesToSlide: 1, // optional, default to 1.
//     },
//     small: {
//       breakpoint: { max: 700, min: 0 },
//       items: 1,
//       slidesToSlide: 1, // optional, default to 1.
//     },
//   };

//   return (
//     <>
//       <div className="container departments">
//         <h2>Departments</h2>
//         <Carousel
//           responsive={responsive}
//           removeArrowOnDeviceType={[
//             // "superLargeDesktop",
//             // "desktop",
//             "tablet",
//             "mobile",
//           ]}
//         >
//           {departmentsArray.map((depart, index) => {
//             return (
//               <div key={index} className="card">
//                 <div className="depart-name">{depart.name}</div>
//                 <img src={depart.imageUrl} alt="Department" />
//               </div>
//             );
//           })}
//         </Carousel>
//       </div>
//     </>
//   );
// };

// export default Departments;

import React from "react";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      description: `Pediatrics is the branch of medicine that involves the medical care of infants, children, and adolescents. It focuses on the diagnosis, treatment, and prevention of diseases and conditions affecting young individuals. Pediatricians work not only to treat illnesses but also to monitor the growth and development of children, ensuring they meet developmental milestones.`,
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      description: `Orthopedics is a medical specialty focused on diagnosing, treating, and managing conditions and injuries related to the musculoskeletal system. Orthopedic specialists handle a wide range of issues, from fractures and sprains to chronic conditions like arthritis. They also perform surgeries, such as joint replacements and spine corrections.`,
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      description: `Cardiology is the branch of medicine that deals with disorders of the heart and circulatory system. Cardiologists diagnose and treat conditions such as heart attacks, arrhythmias, and heart failure. They also provide preventive care, helping patients manage risk factors like high blood pressure, high cholesterol, and lifestyle habits. Advances in cardiology have led to life-saving procedures such as angioplasty, stent placement, and heart surgery. Cardiology plays a vital role in ensuring cardiovascular health and improving life expectancy.`,
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      description: `Neurology focuses on diagnosing and treating disorders of the nervous system, including the brain, spinal cord, and peripheral nerves. Neurologists handle conditions such as epilepsy, migraines, multiple sclerosis, and Parkinson’s disease. They use advanced imaging techniques and diagnostic tools to identify neurological issues accurately. Neurology also addresses cognitive and behavioral disorders, aiming to improve patient outcomes through comprehensive care and innovative treatments.`,
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      description: `Oncology is the branch of medicine dedicated to the study, diagnosis, and treatment of cancer. Oncologists work to develop personalized treatment plans based on the type and stage of cancer, often combining surgery, chemotherapy, radiation therapy, and immunotherapy. Oncology also emphasizes preventive care and early detection through screenings and genetic testing. With advancements in medical research, oncology continues to improve survival rates and the quality of life for patients battling cancer.`,
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      description: `Radiology is a medical specialty that uses imaging techniques such as X-rays, CT scans, MRIs, and ultrasounds to diagnose and treat diseases. Radiologists play a critical role in identifying health conditions, guiding surgical procedures, and monitoring treatment progress. This field bridges diagnostic expertise with advanced technology, enabling early detection of illnesses and accurate assessments of injuries. Radiology is indispensable in modern healthcare, offering precision and efficiency in patient care.`,
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      description: `Physical therapy focuses on enhancing and restoring mobility and functional ability in individuals affected by injury, illness, or disability. Physical therapists use targeted exercises, manual therapy, and advanced techniques to alleviate pain, promote recovery, and prevent future injuries. Whether aiding post-surgery rehabilitation or managing chronic conditions, physical therapy empowers patients to regain independence and improve their overall quality of life.`,
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      description: `Dermatology is the branch of medicine concerned with the diagnosis and treatment of skin, hair, and nail conditions. Dermatologists address a wide range of issues, from acne and eczema to more severe conditions like psoriasis and skin cancer. They also perform cosmetic procedures to improve skin appearance. With a focus on both health and aesthetics, dermatology plays a vital role in enhancing patient confidence and well-being.`,
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      description: `ENT, or otolaryngology, is the medical specialty focused on the diagnosis and treatment of disorders related to the ear, nose, and throat. This field addresses conditions like hearing loss, sinusitis, voice disorders, and sleep apnea. ENT specialists also perform surgeries, such as tonsil removal and cochlear implants. With expertise spanning multiple sensory systems, ENT care enhances communication, breathing, and overall quality of life.`,
    },
  ];

  return (
    <div className="container departments">
      <h1 className="text-xl font-bold mb-4">Departments</h1>
      <div className="carousel rounded-box shadow-lg">
        {departmentsArray.map((department, index) => (
          <div key={index} className="carousel-item w-full">
            <div className="relative">
              <img
                src={department.imageUrl}
                alt={department.name}
                className="w-full h-100 object-cover" style={{ borderRadius: "10px" }}/>
              <div className="absolute bottom-0 left-0 w-full h-12 mb-3.5  bg-black bg-opacity-50 text-white text-center py-2" style={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                {department.name}
              </div>
            </div>
            {/* Description is hidden on small screens and visible on medium or larger screens */}
            <div >
            <p className="mt-2 text-justify text-gray-700 hidden md:block ml-4" style={{ fontSize:"medium" , width: "100%"}}>
              {department.description}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;

