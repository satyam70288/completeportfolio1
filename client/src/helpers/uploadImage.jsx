export const uploadImage = async (selectedImage) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "portfolio");
      formData.append("api_key", "123854684581534");
  
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwfvl9smj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!res.ok) {
        const errorText = await res.text(); // Get the response body as text
        console.error(`Image upload failed with status: ${res.status}. Response: ${errorText}`);
        throw new Error(`Image upload failed with status: ${res.status}`);
      }
      
      const data = await res.json();
  
      const imageData = {
        secureUrl: data.secure_url,
        publicId: data.public_id,
        deleteToken: data.delete_token,
      };
  
      return imageData;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error; // Rethrow the error for the calling code to handle
    }
  };
  