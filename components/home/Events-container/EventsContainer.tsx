"use cache";
import Events from "../events-of-month/Events";

const FetchEvents = async () => {
  const url = "http://localhost:4000/events";
  const data = await fetch(url);
  const events = await data.json();
  return events;
};

const EventsContainer = async () => {
  const events = await FetchEvents();
  return <Events events={events} />;
};

export default EventsContainer;
