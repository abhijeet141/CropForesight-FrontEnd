import Navbar from "../Navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import swal from 'sweetalert';

export function ImageUpload() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOADPRESET
        }, function (error, result) {
            if (!error && result && result.event === 'success') {
                setImage(result.info.secure_url);
                Modelprediction(result.info.secure_url);
            }
        });
    }, []);

    const Modelprediction = async (imageUrl) => {
        setLoading(true);
        try {
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();

            const formData = new FormData();
            formData.append('fileUploadedByUser', imageBlob, 'image.jpg');

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_FASTAPI}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const prediction = response.data;

            setLoading(false);

            swal({
                title: "Prediction Result",
                text: `
                    Tomato Plant Leaf has ${prediction.predicted_result} with a Confidence Score of  ${prediction.confidence}.
                `,
                icon: "success",
                buttons: "OK",
            });

        } catch (error) {
            setLoading(false);
            console.error("Error", error);
            swal({
                title: "Error",
                text: "An error occurred while fetching the prediction.",
                icon: "error",
                buttons: "OK",
            });
        }
    };

    return (
        <>
            <Navbar isHomepage={false} />
            <div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column", marginTop:"15rem" }}>
                    <div>
                    <FontAwesomeIcon
                        style={{ width: "8rem", height: "auto", cursor: "pointer" }}
                        icon={faFolder}
                        onClick={() => {
                            widgetRef.current.open();
                        }}
                    />
                    </div>
                    <div style={{fontSize:"20px",textTransform:"capitalize",textAlign:"center"}}>
                        Click on the folder icon to upload photo of diseased tomato leaf
                    </div>
                </div>
                {loading && <p style={{ textAlign: "center", color:"white", fontSize:"20px", marginTop:"10px" }}>Loading...</p>}
            </div>
        </>
    );
}
