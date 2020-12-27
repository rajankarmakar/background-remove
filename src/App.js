import { useState } from "react";
import axios from "axios";

function App() {
	const [imgUrl, setUrl] = useState("");
	const [imgData, setImgData] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const getUrl = (e) => {
		const url = e.target.value;
		setUrl(url);
	};
	const removeBg = (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios({
			url: `${process.env.REACT_APP_BASE_URL}/v1.0/removebg`,
			method: "post",
			data: {
				image_url: imgUrl,
				size: "auto",
				format: "auto",
				type: "auto",
			},
			headers: {
				"X-Api-Key": process.env.REACT_APP_XAPIKEY,
			},
			responseType: "blob",
			encoding: null,
		})
			.then((response) => {
				setImgData(URL.createObjectURL(response.data));
				setUrl("");
				setIsLoading(false);
			})
			.catch((e) => console.log(e, "something missing"));
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 offset-md-2 text-center">
					<h1 className="text-success my-5">
						Remove Background from image url VIA api call
					</h1>
					<div className="form-group">
						<form
							encType="multipart/form-data"
							onSubmit={(e) => e.preventDefault()}
						>
							<input
								type="text"
								className="form-control mb-5"
								placeholder="Enter image url"
								onChange={(e) => {
									getUrl(e);
								}}
								value={imgUrl}
							/>
							{isLoading ? (
								<p className="mt-5"> Loading please wait....</p>
							) : (
								<button
									className={
										isLoading
											? "disable"
											: "btn btn-success"
									}
									onClick={removeBg}
									type="submit"
								>
									Remove bg
								</button>
							)}
						</form>
					</div>

					{imgData && !isLoading && (
						<img alt="bgremoved" src={imgData} />
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
