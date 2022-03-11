const TopBar = () => {
	return (
		<div className="flex fixed top-0 w-full justify-center border-b border-gray-300 bg-white z-10 px-4">
			<div className="py-5 flex flex-row justify-between max-w-4xl align-center w-full">
				<div>LOGO</div>
				<div className="flex flex-row">
					<div className="text-green">Account</div>
					<div>Notifications</div>
				</div>
			</div>
		</div>
	);
};
export default TopBar;
