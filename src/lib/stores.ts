export type Store = {
  name: string;
  /** Builds a live search URL on the store for the given query. */
  url: (q: string) => string;
};

const e = encodeURIComponent;

function s(name: string, build: (q: string) => string): Store {
  return { name, url: build };
}

export type TabId = "products" | "flights" | "hotels" | "trains" | "travel";

export const STORES: Record<TabId, Record<string, Store[]>> = {
  products: {
    US: [
      s("Amazon.com", (q) => `https://www.amazon.com/s?k=${e(q)}`),
      s("Walmart", (q) => `https://www.walmart.com/search?q=${e(q)}`),
      s("Target", (q) => `https://www.target.com/s?searchTerm=${e(q)}`),
      s("Best Buy", (q) => `https://www.bestbuy.com/site/searchpage.jsp?st=${e(q)}`),
      s("eBay", (q) => `https://www.ebay.com/sch/i.html?_nkw=${e(q)}`),
      s("Costco", (q) => `https://www.costco.com/CatalogSearch?keyword=${e(q)}`),
      s("Newegg", (q) => `https://www.newegg.com/p/pl?d=${e(q)}`),
      s("B&H Photo", (q) => `https://www.bhphotovideo.com/c/search?q=${e(q)}`),
    ],
    UK: [
      s("Amazon.co.uk", (q) => `https://www.amazon.co.uk/s?k=${e(q)}`),
      s("Currys", (q) => `https://www.currys.co.uk/search?q=${e(q)}`),
      s("Argos", (q) => `https://www.argos.co.uk/search/${e(q)}/`),
      s("John Lewis", (q) => `https://www.johnlewis.com/search?search-term=${e(q)}`),
      s("eBay UK", (q) => `https://www.ebay.co.uk/sch/i.html?_nkw=${e(q)}`),
    ],
    IN: [
      s("Amazon.in", (q) => `https://www.amazon.in/s?k=${e(q)}`),
      s("Flipkart", (q) => `https://www.flipkart.com/search?q=${e(q)}`),
      s("Croma", (q) => `https://www.croma.com/searchB?q=${e(q)}`),
      s("Reliance Digital", (q) => `https://www.reliancedigital.in/search?q=${e(q)}`),
      s("Tata Cliq", (q) => `https://www.tatacliq.com/search/?searchCategory=all&text=${e(q)}`),
    ],
    DE: [
      s("Amazon.de", (q) => `https://www.amazon.de/s?k=${e(q)}`),
      s("MediaMarkt", (q) => `https://www.mediamarkt.de/de/search.html?query=${e(q)}`),
      s("Saturn", (q) => `https://www.saturn.de/de/search.html?query=${e(q)}`),
      s("Otto", (q) => `https://www.otto.de/suche/${e(q)}/`),
      s("Idealo", (q) => `https://www.idealo.de/preisvergleich/MainSearchProductCategory.html?q=${e(q)}`),
    ],
    JP: [
      s("Amazon.co.jp", (q) => `https://www.amazon.co.jp/s?k=${e(q)}`),
      s("Rakuten", (q) => `https://search.rakuten.co.jp/search/mall/${e(q)}/`),
      s("Yodobashi", (q) => `https://www.yodobashi.com/?word=${e(q)}`),
      s("Bic Camera", (q) => `https://www.biccamera.com/bc/category/?q=${e(q)}`),
    ],
    AU: [
      s("Amazon.com.au", (q) => `https://www.amazon.com.au/s?k=${e(q)}`),
      s("JB Hi-Fi", (q) => `https://www.jbhifi.com.au/?q=${e(q)}`),
      s("Harvey Norman", (q) => `https://www.harveynorman.com.au/catalogsearch/result/?q=${e(q)}`),
      s("Officeworks", (q) => `https://www.officeworks.com.au/shop/officeworks/search?q=${e(q)}`),
    ],
    CA: [
      s("Amazon.ca", (q) => `https://www.amazon.ca/s?k=${e(q)}`),
      s("Best Buy CA", (q) => `https://www.bestbuy.ca/en-ca/search?search=${e(q)}`),
      s("Walmart CA", (q) => `https://www.walmart.ca/search?q=${e(q)}`),
      s("Canada Computers", (q) => `https://www.canadacomputers.com/en/search?s=${e(q)}`),
    ],
    AE: [
      s("Amazon.ae", (q) => `https://www.amazon.ae/s?k=${e(q)}`),
      s("Noon", (q) => `https://www.noon.com/uae-en/search/?q=${e(q)}`),
      s("Sharaf DG", (q) => `https://uae.sharafdg.com/?s=${e(q)}`),
      s("Jumbo", (q) => `https://www.jumbo.ae/catalogsearch/result/?q=${e(q)}`),
    ],
  },
  flights: {
    US: [
      s("Google Flights", (q) => `https://www.google.com/travel/flights?q=${e("flights " + q)}`),
      s("Skyscanner", (q) => `https://www.skyscanner.net/search?q=${e(q)}`),
      s("Kayak", (q) => `https://www.kayak.com/flights?search=${e(q)}`),
      s("Expedia", (q) => `https://www.expedia.com/Flights-Search?q=${e(q)}`),
      s("Momondo", (q) => `https://www.momondo.com/flight-search?q=${e(q)}`),
    ],
    UK: [
      s("Skyscanner", (q) => `https://www.skyscanner.net/search?q=${e(q)}`),
      s("Google Flights", (q) => `https://www.google.com/travel/flights?q=${e("flights " + q)}`),
      s("Kayak UK", (q) => `https://www.kayak.co.uk/flights?search=${e(q)}`),
      s("Expedia UK", (q) => `https://www.expedia.co.uk/Flights-Search?q=${e(q)}`),
    ],
    IN: [
      s("MakeMyTrip", (q) => `https://www.makemytrip.com/flights/?q=${e(q)}`),
      s("Goibibo", (q) => `https://www.goibibo.com/flights/?q=${e(q)}`),
      s("Cleartrip", (q) => `https://www.cleartrip.com/flights?q=${e(q)}`),
      s("Skyscanner", (q) => `https://www.skyscanner.co.in/search?q=${e(q)}`),
    ],
    DE: [
      s("Skyscanner", (q) => `https://www.skyscanner.de/search?q=${e(q)}`),
      s("Google Flights", (q) => `https://www.google.com/travel/flights?q=${e("flights " + q)}`),
      s("Kayak DE", (q) => `https://www.kayak.de/flights?search=${e(q)}`),
      s("Opodo", (q) => `https://www.opodo.de/fluege/?q=${e(q)}`),
    ],
    JP: [
      s("Skyscanner", (q) => `https://www.skyscanner.jp/search?q=${e(q)}`),
      s("Google Flights", (q) => `https://www.google.com/travel/flights?q=${e("flights " + q)}`),
      s("Rakuten Travel", (q) => `https://travel.rakuten.co.jp/kokunai/?q=${e(q)}`),
      s("Expedia JP", (q) => `https://www.expedia.co.jp/Flights-Search?q=${e(q)}`),
    ],
    AU: [
      s("Webjet", (q) => `https://www.webjet.com.au/flights/?q=${e(q)}`),
      s("Skyscanner", (q) => `https://www.skyscanner.com.au/search?q=${e(q)}`),
      s("Kayak AU", (q) => `https://www.kayak.com.au/flights?search=${e(q)}`),
    ],
    CA: [
      s("Skyscanner", (q) => `https://www.skyscanner.ca/search?q=${e(q)}`),
      s("Expedia CA", (q) => `https://www.expedia.ca/Flights-Search?q=${e(q)}`),
      s("Kayak CA", (q) => `https://www.ca.kayak.com/flights?search=${e(q)}`),
    ],
    AE: [
      s("Skyscanner", (q) => `https://www.skyscanner.ae/search?q=${e(q)}`),
      s("Wego", (q) => `https://www.wego.ae/flights?q=${e(q)}`),
      s("Almosafer", (q) => `https://global.almosafer.com/en/flights?q=${e(q)}`),
    ],
  },
  hotels: {
    US: [
      s("Booking.com", (q) => `https://www.booking.com/searchresults.html?ss=${e(q)}`),
      s("Hotels.com", (q) => `https://www.hotels.com/search.do?q-destination=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.com/s/${e(q)}/homes`),
      s("Expedia", (q) => `https://www.expedia.com/Hotel-Search?destination=${e(q)}`),
      s("Agoda", (q) => `https://www.agoda.com/search?city=${e(q)}`),
    ],
    UK: [
      s("Booking.com", (q) => `https://www.booking.com/searchresults.en-gb.html?ss=${e(q)}`),
      s("Hotels.com", (q) => `https://uk.hotels.com/search.do?q-destination=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.co.uk/s/${e(q)}/homes`),
      s("Trivago", (q) => `https://www.trivago.co.uk/en-GB/srl?query=${e(q)}`),
    ],
    IN: [
      s("MakeMyTrip", (q) => `https://www.makemytrip.com/hotels/?q=${e(q)}`),
      s("Booking.com", (q) => `https://www.booking.com/searchresults.html?ss=${e(q)}`),
      s("Agoda", (q) => `https://www.agoda.com/search?city=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.co.in/s/${e(q)}/homes`),
    ],
    DE: [
      s("Booking.com", (q) => `https://www.booking.com/searchresults.de.html?ss=${e(q)}`),
      s("HRS", (q) => `https://www.hrs.de/web3/showCityList.do?q=${e(q)}`),
      s("Trivago", (q) => `https://www.trivago.de/de-DE/srl?query=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.de/s/${e(q)}/homes`),
    ],
    JP: [
      s("Rakuten Travel", (q) => `https://travel.rakuten.co.jp/?q=${e(q)}`),
      s("Booking.com", (q) => `https://www.booking.com/searchresults.ja.html?ss=${e(q)}`),
      s("Agoda", (q) => `https://www.agoda.com/search?city=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.jp/s/${e(q)}/homes`),
    ],
    AU: [
      s("Booking.com", (q) => `https://www.booking.com/searchresults.en-gb.html?ss=${e(q)}`),
      s("Wotif", (q) => `https://www.wotif.com/Hotel-Search?destination=${e(q)}`),
      s("Agoda", (q) => `https://www.agoda.com/search?city=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.com.au/s/${e(q)}/homes`),
    ],
    CA: [
      s("Booking.com", (q) => `https://www.booking.com/searchresults.html?ss=${e(q)}`),
      s("Hotels.com", (q) => `https://ca.hotels.com/search.do?q-destination=${e(q)}`),
      s("Expedia CA", (q) => `https://www.expedia.ca/Hotel-Search?destination=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.ca/s/${e(q)}/homes`),
    ],
    AE: [
      s("Booking.com", (q) => `https://www.booking.com/searchresults.html?ss=${e(q)}`),
      s("Agoda", (q) => `https://www.agoda.com/search?city=${e(q)}`),
      s("Almosafer", (q) => `https://global.almosafer.com/en/hotels?q=${e(q)}`),
      s("Airbnb", (q) => `https://www.airbnb.ae/s/${e(q)}/homes`),
    ],
  },
  trains: {
    US: [
      s("Amtrak", (q) => `https://www.amtrak.com/home.html?q=${e(q)}`),
      s("Wanderu", (q) => `https://www.wanderu.com/en-us/search/?q=${e(q)}`),
      s("Rail Europe", (q) => `https://www.raileurope.com/en-us/search?q=${e(q)}`),
    ],
    UK: [
      s("Trainline", (q) => `https://www.thetrainline.com/train-times?q=${e(q)}`),
      s("National Rail", (q) => `https://www.nationalrail.co.uk/journey-planner/?q=${e(q)}`),
      s("LNER", (q) => `https://www.lner.co.uk/search/?q=${e(q)}`),
    ],
    IN: [
      s("IRCTC", (q) => `https://www.irctc.co.in/nget/train-search?q=${e(q)}`),
      s("ConfirmTkt", (q) => `https://www.confirmtkt.com/search?q=${e(q)}`),
      s("RailYatri", (q) => `https://www.railyatri.in/search?q=${e(q)}`),
    ],
    DE: [
      s("Deutsche Bahn", (q) => `https://www.bahn.de/buchung/start?q=${e(q)}`),
      s("Trainline", (q) => `https://www.thetrainline.com/train-times?q=${e(q)}`),
      s("Omio", (q) => `https://www.omio.de/search?q=${e(q)}`),
    ],
    JP: [
      s("Klook", (q) => `https://www.klook.com/en-US/search/?query=${e(q)}`),
      s("Navitime", (q) => `https://japantravel.navitime.com/en/area/jp/search/?q=${e(q)}`),
      s("JR Pass", (q) => `https://www.jrpass.com/search?q=${e(q)}`),
    ],
    AU: [
      s("NSW TrainLink", (q) => `https://transportnsw.info/trip?q=${e(q)}`),
      s("Journey Beyond", (q) => `https://journeybeyondrail.com.au/?s=${e(q)}`),
    ],
    CA: [
      s("VIA Rail", (q) => `https://www.viarail.ca/en?q=${e(q)}`),
      s("Rocky Mountaineer", (q) => `https://www.rockymountaineer.com/search?q=${e(q)}`),
    ],
    AE: [
      s("Omio", (q) => `https://www.omio.com/search?q=${e(q)}`),
      s("Etihad Rail", (q) => `https://www.etihadrail.ae/?s=${e(q)}`),
    ],
  },
  travel: {
    US: [
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("GetYourGuide", (q) => `https://www.getyourguide.com/s/?q=${e(q)}`),
      s("Klook", (q) => `https://www.klook.com/en-US/search/?query=${e(q)}`),
      s("Expedia", (q) => `https://www.expedia.com/things-to-do/search?location=${e(q)}`),
    ],
    UK: [
      s("GetYourGuide", (q) => `https://www.getyourguide.co.uk/s/?q=${e(q)}`),
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("Klook", (q) => `https://www.klook.com/en-GB/search/?query=${e(q)}`),
    ],
    IN: [
      s("Thrillophilia", (q) => `https://www.thrillophilia.com/search?q=${e(q)}`),
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("Klook", (q) => `https://www.klook.com/en-IN/search/?query=${e(q)}`),
    ],
    DE: [
      s("GetYourGuide", (q) => `https://www.getyourguide.de/s/?q=${e(q)}`),
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("Tiqets", (q) => `https://www.tiqets.com/en/search?q=${e(q)}`),
    ],
    JP: [
      s("Klook", (q) => `https://www.klook.com/en-US/search/?query=${e(q)}`),
      s("GetYourGuide", (q) => `https://www.getyourguide.com/s/?q=${e(q)}`),
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
    ],
    AU: [
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("Klook", (q) => `https://www.klook.com/en-AU/search/?query=${e(q)}`),
      s("Experience Oz", (q) => `https://www.experienceoz.com.au/en/search?q=${e(q)}`),
    ],
    CA: [
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("GetYourGuide", (q) => `https://www.getyourguide.com/s/?q=${e(q)}`),
      s("Klook", (q) => `https://www.klook.com/en-CA/search/?query=${e(q)}`),
    ],
    AE: [
      s("Klook", (q) => `https://www.klook.com/en-US/search/?query=${e(q)}`),
      s("Viator", (q) => `https://www.viator.com/search/${e(q)}`),
      s("Headout", (q) => `https://www.headout.com/search?q=${e(q)}`),
    ],
  },
};
