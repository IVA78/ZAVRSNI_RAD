package zavrsni.rad.calendar.events.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.ZonedDateTime;

public class CalendarEventsForm {


    private String title;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private ZonedDateTime startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private ZonedDateTime endTime;

    public CalendarEventsForm() {
    }

    public CalendarEventsForm(String title, ZonedDateTime startTime, ZonedDateTime endTime) {

        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }
}
