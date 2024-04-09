import CountdownTimer from "./countdown";

const Home = () => {
    return (
        <div className="center">
            <h1>Home</h1>
            <p1> Welcome to the home page</p1>
            <p2> there really isn't much here</p2>
            <h1> Greencart will be released in...</h1>
            <CountdownTimer targetDate={new Date("April 19, 2024 00:00:00").getTime()} />
        </div>

    );
}
export default Home;