import ClientTweetCard from "@/app/components/magicui/tweet-card";

/**
 * <TweetCard /> (Server Side Only)
 * <ClientTweetCard /> (Client Side Only)
 */
export async function TweetCard({id}:{id:string}) {
  return <ClientTweetCard id={id} className="shadow-2xl" />;
}
