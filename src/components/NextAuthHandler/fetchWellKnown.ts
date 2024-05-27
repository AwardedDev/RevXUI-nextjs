type FetchWellKnown = {
  token_endpoint: string;
  end_session_endpoint?: string;
  ping_end_session_endpoint?: string;
};

export default async function fetchWellKnown(wellKnownUrl: string): Promise<FetchWellKnown> {
  const wellKnownResponse = await fetch(wellKnownUrl);
  return wellKnownResponse.json();
}
