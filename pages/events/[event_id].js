import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
//import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
// import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import Comments from "@/components/input/comments";

export default function EventDetail(props) {
  // const router = useRouter();
  // const eventId = router.query.event_id;
  const event = props.event;

  if (!event) {
    return (
      <div className="center">
        <p>Loading . . .</p>;
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content={`details about event: ${event.title}`}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.event_id;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { event_id: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
