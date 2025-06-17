import React, { useState, useEffect } from "react"
import { Modal, IconButton, Box, Backdrop, Typography, MobileStepper, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const Certificate = ({ img }) => {
	const [open, setOpen] = useState(false)
	const [activeStep, setActiveStep] = useState(0)
	const [images, setImages] = useState([])

	useEffect(() => {
		// Function to get the base name without (2)
		const getBaseName = (path) => {
			const fileName = path.split('/').pop()
			return fileName.replace(' (2).jpg', '.jpg')
		}

		// Function to find duplicate certificate
		const findDuplicate = () => {
			const basePath = img.substring(0, img.lastIndexOf('/') + 1)
			const baseName = getBaseName(img)
			const duplicatePath = basePath + baseName.replace('.jpg', ' (2).jpg')

			// Create array of images
			if (img.includes(' (2)')) {
				const originalPath = basePath + baseName
				setImages([originalPath, img])
			} else {
				const duplicateExists = new Image()
				duplicateExists.onload = () => setImages([img, duplicatePath])
				duplicateExists.onerror = () => setImages([img])
				duplicateExists.src = duplicatePath
			}
		}

		findDuplicate()
	}, [img])

	const handleOpen = () => {
		setOpen(true)
		setActiveStep(0)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<Box
				className=""
				sx={{
					position: "relative",
					overflow: "hidden",
					borderRadius: 2,
					boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
						"& .overlay": {
							opacity: 1,
						},
						"& .hover-content": {
							transform: "translate(-50%, -50%)",
							opacity: 1,
						},
						"& .certificate-image": {
							filter: "contrast(1.05) brightness(1) saturate(1.1)",
						},
					},
				}}>
				{/* Certificate Image with Initial Filter */}
				<Box
					sx={{
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(0, 0, 0, 0.1)",
							zIndex: 1,
						},
					}}>
					<img
						className="certificate-image"
						src={img}
						alt="Certificate"
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							objectFit: "cover",
							filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
							transition: "filter 0.3s ease",
						}}
						onClick={handleOpen}
					/>
				</Box>

				{/* Hover Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0,
						transition: "all 0.3s ease",
						cursor: "pointer",
						zIndex: 2,
					}}
					onClick={handleOpen}>
					{/* Hover Content */}
					<Box
						className="hover-content"
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -60%)",
							opacity: 0,
							transition: "all 0.4s ease",
							textAlign: "center",
							width: "100%",
							color: "white",
						}}>
						<FullscreenIcon
							sx={{
								fontSize: 40,
								mb: 1,
								filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
							}}
						/>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 600,
								textShadow: "0 2px 4px rgba(0,0,0,0.3)",
							}}>
							View Certificate
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						backdropFilter: "blur(5px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<Box
					sx={{
						position: "relative",
						width: "auto",
						maxWidth: "90vw",
						maxHeight: "90vh",
						m: 0,
						p: 0,
						outline: "none",
						"&:focus": {
							outline: "none",
						},
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: -40,
							top: -40,
							color: "white",
							backgroundColor: "rgba(255, 255, 255, 0.1)",
							"&:hover": {
								backgroundColor: "rgba(255, 255, 255, 0.2)",
							},
						}}>
						<CloseIcon />
					</IconButton>

					{/* Image Container */}
					<Box
						sx={{
							position: "relative",
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<img
							src={images[activeStep]}
							alt={`Certificate ${activeStep + 1}`}
							style={{
								maxWidth: "100%",
								maxHeight: "80vh",
								objectFit: "contain",
								borderRadius: "8px",
								boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
							}}
						/>
					</Box>

					{/* Navigation Stepper */}
					{images.length > 1 && (
						<MobileStepper
							steps={images.length}
							position="static"
							activeStep={activeStep}
							sx={{
								backgroundColor: "transparent",
								color: "white",
								"& .MuiMobileStepper-dot": {
									backgroundColor: "rgba(255, 255, 255, 0.3)",
								},
								"& .MuiMobileStepper-dotActive": {
									backgroundColor: "white",
								},
							}}
							nextButton={
								<Button
									size="small"
									onClick={handleNext}
									disabled={activeStep === images.length - 1}
									sx={{
										color: "white",
										"&.Mui-disabled": {
											color: "rgba(255, 255, 255, 0.3)",
										},
									}}>
									Next
									<KeyboardArrowRight />
								</Button>
							}
							backButton={
								<Button
									size="small"
									onClick={handleBack}
									disabled={activeStep === 0}
									sx={{
										color: "white",
										"&.Mui-disabled": {
											color: "rgba(255, 255, 255, 0.3)",
										},
									}}>
									<KeyboardArrowLeft />
									Back
								</Button>
							}
						/>
					)}
				</Box>
			</Modal>
		</Box>
	)
}

export default Certificate