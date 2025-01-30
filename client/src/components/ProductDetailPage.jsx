import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from './Navbar';
import { Modal } from 'react-bootstrap';  // Import Modal and Button from react-bootstrap
import Swal from 'sweetalert2';
import loadingif from './loading.gif';
const ProductDetail = () => {
  const { carId } = useParams();
  const location = useLocation();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carImages, setCarImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: null
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const navigate = useNavigate();

  const passedCarId = location.state?.carId || carId;

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars/${passedCarId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
          }
        });
        setCar(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          tags: response.data.tags.join(', '), // Join tags for easier editing
          images: null
        });
        fetchCarImages(response.data.images);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCarImages = async (images) => {
      const imageUrls = await Promise.all(
        images.map(async (imageId) => {
          try {
            const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-image/${imageId}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
              },
              responseType: 'blob'
            });
            return URL.createObjectURL(imageResponse.data);
          } catch (err) {
            console.error(`Error fetching image ${imageId}:`, err);
            return null;
          }
        })
      );
      setCarImages(imageUrls.filter((url) => url !== null));
    };

    if (passedCarId) {
      fetchCarDetail();
    }
  }, [passedCarId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files
    });
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const updateData = new FormData();
      updateData.append('title', formData.title);
      updateData.append('description', formData.description);
      updateData.append('tags', JSON.stringify(formData.tags.split(','))); // Convert tags to an array

      if (formData.images) {
        for (let image of formData.images) {
          updateData.append('images', image);
        }
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/cars/${passedCarId}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('authToken'),
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Car Updated',
        text: 'The car details have been updated successfully.',
        confirmButtonText: 'OK',
      });
      setShowModal(false);
      window.location.reload(); // Close the modal after successful update

    } catch (error) {
      console.error('Error updating car:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the car. Please try again.',
        confirmButtonText: 'Retry',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteCar = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cars/${passedCarId}`, {
        headers: {
          'Authorization': localStorage.getItem('authToken')
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Car deleted successfully',
        text: 'The car details have been updated successfully.',
        confirmButtonText: 'OK',
      });
      navigate('/'); // Redirect to the list of cars after deletion
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  };

  if (loading) return <>
    <div className='d-flex justify-content-center align-items-center mt-5'>
      <img src={loadingif} style={{height:'100px', width:'100px'}} alt="" />
    </div>
  </>;

  return (
    <div className="container">
      <Navbar />
      <button
        className="btn btn-outline-dark mt-3"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <h4 className="mt-2">More Information about Car: {car.title}</h4>
      {car ? (
        <div className="row justify-content-center mt-5">
          <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            {carImages.length > 0 ? (
              <Carousel showThumbs={false} dynamicHeight={false} showStatus={true}>
                {carImages.map((imageUrl, index) => (
                  <div key={index} style={{ width: '100%', maxHeight: '500px', borderRadius: '14px', overflow: 'hidden', }}>
                    <img
                      src={imageUrl}
                      alt={index + 1}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <h2>No images found</h2>
            )}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10 mt-3">
            <h3>Model Name: {car.title}</h3>
            <p>Model Description: {car.description}</p>
            <p>
              <strong>Tags:</strong> {car.tags.join(', ')}
            </p>

            <button className="btn btn-outline-dark" onClick={() => setShowModal(true)}><i class="bi bi-pencil-fill me-2"></i>Edit Car</button>

          </div>
        </div>
      ) : (
        <h2>Car not found</h2>
      )}

      {/* Modal for updating car */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCar}>
            <div className="form-group mt-3">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                className="form-control mt-3"
                name="tags"
                value={formData.tags}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Images</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark mt-3 mt-3"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Car'}
            </button>
            <button className="btn btn-outline-danger mt-3 mx-2" onClick={handleDeleteCar}>Delete Car</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetail;
