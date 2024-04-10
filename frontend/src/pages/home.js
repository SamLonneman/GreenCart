import CountdownTimer from "./countdown";

const Home = () => {
    return (
        <div className="center">
            <h1> Greencart will be released in...</h1>
            <CountdownTimer targetDate={new Date("April 24, 2024 15:00:00").getTime()} />
        </div>

    );
}
export default Home;