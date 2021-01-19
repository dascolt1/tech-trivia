import Lives from './Lives'

const Scoreboard = ({ score, lives }) => {
    let hearts = [];

    for(let i=0; i<lives; i++) {
        hearts.push(<Lives key={i} />)
    }

    return(
        <div className="score-board">
            <p className="score">Score: {score}</p>
            <div className="lives">
                {hearts}
            </div>
        </div>
    );
}

export default Scoreboard;