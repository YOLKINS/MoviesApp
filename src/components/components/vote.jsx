import React from 'react';

const Vote = (props) => {
  const { voteAverage } = props;

  const vote = parseFloat(voteAverage.toFixed(1));

  let color;

  if (vote >= 0 && vote < 3) {
    color = '#E90000';
  } else if (vote >= 3 && vote < 5) {
    color = '#E97E00';
  } else if (vote >= 5 && vote < 7) {
    color = '#E9D100';
  } else {
    color = '#66E900';
  }

  return (
    <div className="vote__average" style={{ border: `2px solid ${color}`, borderRadius: '50%' }}>
      {vote}
    </div>
  );
};

export default Vote;
