import React from 'react';

const VideoCard = () => {
  return (
    <div className={appointmentsIndex > -1 ? "video-container selected" : "video-container"} key={item._id} >
      <div className="video_iframe">
        <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen ></iframe>
      </div>

      <div className="video_info">
        <div className="video_select-bg" onClick={(e) => { setVideoSelected(index) }}></div>

        <p className="video_label">{item.name}</p>
        <p className="video_label">{item._id}</p>
        <p className="video_label">{appointmentsIndex}</p>

        <div className="video_review">
          <TextField
            className="video_review"
            label="Комментарий к задаче видео"
            multiline
            rows={4}
            variant="outlined"
            defaultValue={review}
            onChange={(e) => { setReview(e.target.value, index) }}
          />
        </div>

        <div className="video_counts" >

          <div className="count_item" >
            <TextField
              label="Повторений кол-во раз"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => { setCountRepeat(e.target.value, index) }}
            />
          </div>

          <div className="count_item" >
            <TextField
              label="Повторений кол-во дней"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => { setCountDays(e.target.value, index) }}
            />
          </div>

        </div>
      </div>
    </div>

  );
};

export default VideoCard;