// api/mediaKit.js
import API_INSTANCE from "./index";



export const getMediaKitBasicDetails = async () => {
  try {
    const res = await API_INSTANCE.get("/media-kit/basic-details");
    return res.data;
  } catch (error) {
    console.error("Error fetching media kit details:", error);
    throw error;
  }
};

export const updateMediaKitBasicDetails = async (formData) => {
  try {
    const res = await API_INSTANCE.patch("/media-kit/basic-details", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating media kit details:", error);
    throw error;
  }
};


// portfolio  


export const getMediaKitPortfolioItems = async () => {
  try {
    const res = await API_INSTANCE.get("/media-kit/portfolio");
    return res.data;
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    throw error;
  }
};

export const addMediaKitPortfolioItem = async (formData) => {
  try {
    const res = await API_INSTANCE.post("/media-kit/portfolio", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    throw error;
  }
};

// previous collaborations
export const getMediaKitCollaborations = async () => {
  try {
    const res = await API_INSTANCE.get("/media-kit/collaborations");
    return res.data;
  } catch (error) {
    console.error("Error fetching collaborations:", error);
    throw error;
  }
};

export const addMediaKitCollaboration = async (formData) => {
  try {
    const res = await API_INSTANCE.post("/media-kit/collaborations", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding collaboration:", error);
    throw error;
  }
};

export const deleteMediaKitCollaboration = async (collaborationId) => {
  try {
    const res = await API_INSTANCE.delete(`/media-kit/collaborations/${collaborationId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting collaboration:", error);
    throw error;
  }
};




// pricing 

export const getMediaKitPackages = async () => {
  try {
    const res = await API_INSTANCE.get("/media-kit/packages");
    return res.data;
  } catch (error) {
    console.error("Error fetching pricing packages:", error);
    throw error;
  }
};

export const addMediaKitPackage = async (packageData) => {
  try {
    const res = await API_INSTANCE.post("/media-kit/packages", packageData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding pricing package:", error);
    throw error;
  }
};

export const updateMediaKitPackage = async (packageId, packageData) => {
  try {
    const res = await API_INSTANCE.patch(`/media-kit/packages/${packageId}`, packageData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating pricing package:", error);
    throw error;
  }
};

export const deleteMediaKitPackage = async (packageId) => {
  try {
    const res = await API_INSTANCE.delete(`/media-kit/packages/${packageId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting pricing package:", error);
    throw error;
  }
};


// personal info 

export const getMediaKitPersonalInfo = async () => {
  try {
    const res = await API_INSTANCE.get("/media-kit/personal-info");
    return res.data;
  } catch (error) {
    console.error("Error fetching personal info:", error);
    throw error;
  }
};

export const updateMediaKitPersonalInfo = async (personalInfo) => {
  try {
    const res = await API_INSTANCE.patch("/media-kit/personal-info", personalInfo);
    return res.data;
  } catch (error) {
    console.error("Error updating personal info:", error);
    throw error;
  }
};



//preview media kit 
export const getMediaKitPreview = async () => {
  try {
    const res = await API_INSTANCE.get("/get-media-kit/preview");
    return res.data;
  } catch (error) {
    console.error("Error fetching preview:", error);
    throw error;
  }
};