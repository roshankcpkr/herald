export type RSSFeed = {
  url: string;
  name: string;
  category: string;
};

export const rssFeeds: RSSFeed[] = [
  {
    url: "https://feeds.twit.tv/aaa.xml",
    name: "All About Android (Audio)",
    category: "Android",
  },
  {
    url: "https://blog.google/products/android/rss",
    name: "Android",
    category: "Android",
  },
  {
    url: "https://www.reddit.com/r/android/.rss",
    name: "Android",
    category: "Android",
  },
  {
    url: "https://www.androidauthority.com/feed",
    name: "Android Authority",
    category: "Android",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=AndroidAuthority",
    name: "Android Authority",
    category: "Android",
  },
  {
    url: "https://androidauthority.libsyn.com/rss",
    name: "Android Authority Podcast",
    category: "Android",
  },
  {
    url: "http://feeds.androidcentral.com/androidcentral",
    name: "Android Central",
    category: "Android",
  },
  {
    url: "http://feeds.feedburner.com/AndroidCentralPodcast",
    name: "Android Central Podcast",
    category: "Android",
  },
  {
    url: "https://androidcommunity.com/feed/",
    name: "Android Community",
    category: "Android",
  },
  {
    url: "http://feeds.feedburner.com/AndroidPolice",
    name: "Android Police",
    category: "Android",
  },
  {
    url: "https://www.cultofandroid.com/feed",
    name: "Cult of Android",
    category: "Android",
  },
  {
    url: "https://www.cyanogenmods.org/feed",
    name: "Cyanogen Mods",
    category: "Android",
  },
  {
    url: "https://www.droid-life.com/feed",
    name: "Droid Life",
    category: "Android",
  },
  {
    url: "https://www.gsmarena.com/rss-news-reviews.php3",
    name: "GSMArena",
    category: "Android",
  },
  {
    url: "http://feeds2.feedburner.com/AndroidPhoneFans",
    name: "Phandroid",
    category: "Android",
  },
  {
    url: "http://feeds.feedburner.com/AndroidNewsGoogleAndroidForums",
    name: "TalkAndroid",
    category: "Android",
  },

  {
    url: "https://www.youtube.com/feeds/videos.xml?user=androiddevelopers",
    name: "Android Developers",
    category: "Android Development",
  },
  {
    url: "https://medium.com/feed/androiddevelopers",
    name: "Android Developers - Medium",
    category: "Android Development",
  },
  {
    url: "http://feeds.feedburner.com/blogspot/androiddevelopersbackstage",
    name: "Android Developers Backstage",
    category: "Android Development",
  },
  {
    url: "http://feeds.feedburner.com/blogspot/hsDu",
    name: "Android Developers Blog",
    category: "Android Development",
  },
  {
    url: "https://instagram-engineering.com/feed/tagged/android",
    name: "Android in Instagram Engineering on Medium",
    category: "Android Development",
  },
  {
    url: "https://medium.com/feed/mindorks/tagged/android",
    name: "Android in MindOrks on Medium",
    category: "Android Development",
  },
  {
    url: "https://medium.com/feed/airbnb-engineering/tagged/android",
    name: "Android in The Airbnb Tech Blog on Medium",
    category: "Android Development",
  },
  {
    url: "https://blog.danlew.net/rss/",
    name: "Dan Lew Codes",
    category: "Android Development",
  },
  {
    url: "https://reddit.com/r/androiddev.rss",
    name: "Developing Android Apps",
    category: "Android Development",
  },
  {
    url: "https://feeds.simplecast.com/LpAGSLnY",
    name: "Fragmented - The Software Podcast",
    category: "Android Development",
  },
  {
    url: "https://handstandsam.com/feed/",
    name: "Handstand Sam",
    category: "Android Development",
  },
  {
    url: "https://jakewharton.com/atom.xml",
    name: "Jake Wharton",
    category: "Android Development",
  },
  {
    url: "https://blog.jetbrains.com/blog/feed",
    name: "JetBrains News - JetBrains Blog",
    category: "Android Development",
  },
  {
    url: "https://joebirch.co/feed",
    name: "Joe Birch",
    category: "Android Development",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?playlist_id=PLQ176FUIyIUa6SChjajjVc-LMzxWiz6dy",
    name: "Kotlin",
    category: "Android Development",
  },
  {
    url: "https://blog.kotlin-academy.com/feed",
    name: "Kt. Academy - Medium",
    category: "Android Development",
  },
  {
    url: "https://okkotlin.com/rss.xml",
    name: "OkKotlin",
    category: "Android Development",
  },
  {
    url: "https://proandroiddev.com/feed",
    name: "ProAndroidDev - Medium",
    category: "Android Development",
  },
  {
    url: "https://publicobject.com/rss/",
    name: "Public Object",
    category: "Android Development",
  },
  {
    url: "https://saket.me/feed/",
    name: "Saket Narayan",
    category: "Android Development",
  },
  {
    url: "https://feeds.soundcloud.com/users/soundcloud:users:280353173/sounds.rss",
    name: "Talking Kotlin",
    category: "Android Development",
  },
  {
    url: "https://feeds.feedburner.com/Android_Arsenal",
    name: "The Android Arsenal",
    category: "Android Development",
  },
  {
    url: "https://www.zacsweers.dev/rss/",
    name: "Zac Sweers",
    category: "Android Development",
  },
  {
    url: "https://zarah.dev/feed.xml",
    name: "Zarah Dominguez",
    category: "Android Development",
  },
  {
    url: "https://chrynan.codes/rss/",
    name: "chRyNaN Codes",
    category: "Android Development",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCSLXy31j2Z0sdDeeAX5JpPw",
    name: "droidcon NYC",
    category: "Android Development",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCKubKoe1CBw_-n_GXetEQbg",
    name: "droidcon SF",
    category: "Android Development",
  },
  {
    url: "https://goobar.io/feed",
    name: "goobar",
    category: "Android Development",
  },
  {
    url: "https://zsmb.co/index.xml",
    name: "zsmb.co",
    category: "Android Development",
  },
  {
    url: "https://9to5mac.com/feed",
    name: "9to5Mac",
    category: "Apple",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=Apple",
    name: "Apple",
    category: "Apple",
  },
  {
    url: "https://www.apple.com/newsroom/rss-feed.rss",
    name: "Apple Newsroom",
    category: "Apple",
  },
  {
    url: "https://appleinsider.com/rss/news/",
    name: "AppleInsider News",
    category: "Apple",
  },
  {
    url: "https://www.cultofmac.com/feed",
    name: "Cult of Mac",
    category: "Apple",
  },
  {
    url: "https://daringfireball.net/feeds/main",
    name: "Daring Fireball",
    category: "Apple",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=macrumors",
    name: "MacRumors",
    category: "Apple",
  },
  {
    url: "http://feeds.macrumors.com/MacRumors-Mac",
    name: "MacRumors: Mac News and Rumors - Mac Blog",
    category: "Apple",
  },
  {
    url: "https://www.macstories.net/feed",
    name: "MacStories",
    category: "Apple",
  },
  {
    url: "https://www.macworld.com/index.rss",
    name: "Macworld.com",
    category: "Apple",
  },
  {
    url: "https://marco.org/rss",
    name: "Marco.org",
    category: "Apple",
  },
  {
    url: "http://feeds.feedburner.com/osxdaily",
    name: "OS X Daily",
    category: "Apple",
  },
  {
    url: "https://www.loopinsight.com/feed",
    name: "The Loop",
    category: "Apple",
  },
  {
    url: "https://www.reddit.com/r/apple/.rss",
    name: "The unofficial Apple community",
    category: "Apple",
  },
  {
    url: "http://feeds.feedburner.com/TheiPhoneBlog",
    name: "iMore - The #1 iPhone, iPad, and iPod touch blog",
    category: "Apple",
  },
  {
    url: "https://www.reddit.com/r/iphone/.rss",
    name: "r/iPhone",
    category: "Apple",
  },
  {
    url: "http://feeds.feedburner.com/archidose",
    name: "A Daily Dose of Architecture Books",
    category: "Architecture",
  },
  {
    url: "http://feeds.feedburner.com/Archdaily",
    name: "ArchDaily",
    category: "Architecture",
  },
  {
    url: "https://archinect.com/feed/1/news",
    name: "Archinect - News",
    category: "Architecture",
  },
  {
    url: "https://www.architecturaldigest.com/feed/rss",
    name: "Architectural Digest",
    category: "Architecture",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=ArchitecturalDigest",
    name: "Architectural Digest (YouTube)",
    category: "Architecture",
  },
  {
    url: "https://www.reddit.com/r/architecture/.rss",
    name: "Architecture (Reddit)",
    category: "Architecture",
  },
  {
    url: "https://www.dezeen.com/architecture/feed/",
    name: "Architecture – Dezeen",
    category: "Architecture",
  },
  {
    url: "https://www.contemporist.com/feed/",
    name: "CONTEMPORIST",
    category: "Architecture",
  },
  {
    url: "https://inhabitat.com/architecture/feed/",
    name: "Inhabitat - Architecture",
    category: "Architecture",
  },
  {
    url: "https://design-milk.com/category/architecture/feed/",
    name: "Design Milk - Architecture",
    category: "Architecture",
  },
  {
    url: "https://architizer.wpengine.com/feed/",
    name: "Architizer - Journal",
    category: "Architecture",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=livingbigtinyhouse",
    name: "Living Big In A Tiny House (YouTube)",
    category: "Architecture",
  },
  {
    url: "https://archpaper.com/feed",
    name: "The Architect’s Newspaper",
    category: "Architecture",
  },
  {
    url: "https://www.designboom.com/architecture/feed/",
    name: "architecture – designboom",
    category: "Architecture",
  },

  // Beauty
  {
    url: "https://www.elle.com/rss/beauty.xml/",
    name: "Beauty - ELLE",
    category: "Beauty",
  },
  {
    url: "https://www.fashionlady.in/category/beauty-tips/feed",
    name: "Beauty – Indian Fashion Blog",
    category: "Beauty",
  },
  {
    url: "https://thebeautybrains.com/blog/feed/",
    name: "Blog – The Beauty Brains",
    category: "Beauty",
  },
  {
    url: "http://feeds.feedburner.com/frmheadtotoe",
    name: "From Head To Toe",
    category: "Beauty",
  },
  {
    url: "https://feeds.feedburner.com/intothegloss/oqoU",
    name: "Into The Gloss",
    category: "Beauty",
  },
  {
    url: "https://www.popsugar.com/beauty/feed",
    name: "POPSUGAR Beauty",
    category: "Beauty",
  },
  {
    url: "https://www.refinery29.com/beauty/rss.xml",
    name: "Refinery29 Beauty",
    category: "Beauty",
  },

  {
    url: "https://thebeautylookbook.com/feed",
    name: "The Beauty Look Book",
    category: "Beauty",
  },

  // Books
  {
    url: "https://ayearofreadingtheworld.com/feed/",
    name: "A year of reading the world",
    category: "Books",
  },
  {
    url: "https://aestasbookblog.com/feed/",
    name: "Aestas Book Blog",
    category: "Books",
  },
  {
    url: "https://bookriot.com/feed/",
    name: "BOOK RIOT",
    category: "Books",
  },
  {
    url: "https://www.kirkusreviews.com/feeds/rss/",
    name: "Kirkus Reviews",
    category: "Books",
  },
  {
    url: "https://www.newinbooks.com/feed/",
    name: "Page Array – NewInBooks",
    category: "Books",
  },
  {
    url: "https://reddit.com/r/books/.rss",
    name: "So many books, so little time (Reddit)",
    category: "Books",
  },
  {
    url: "https://wokeread.home.blog/feed/",
    name: "Wokeread",
    category: "Books",
  },
  {
    url: "https://www.investing.com/rss/news.rss",
    name: "All News - Investing.com",
    category: "Business & Economy",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=Bloomberg",
    name: "Bloomberg Quicktake (YouTube)",
    category: "Business & Economy",
  },
  {
    url: "https://seekingalpha.com/market_currents.xml",
    name: "Breaking News on Seeking Alpha",
    category: "Business & Economy",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=businessinsider",
    name: "Business Insider (YouTube)",
    category: "Business & Economy",
  },
  {
    url: "https://ducttape.libsyn.com/rss",
    name: "Duct Tape Marketing",
    category: "Business & Economy",
  },
  {
    url: "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
    name: "Economic Times",
    category: "Business & Economy",
  },
  {
    url: "https://www.forbes.com/business/feed/",
    name: "Forbes - Business",
    category: "Business & Economy",
  },
  {
    url: "https://fortune.com/feed",
    name: "Fortune",
    category: "Business & Economy",
  },
  {
    url: "http://feeds.harvardbusiness.org/harvardbusiness/ideacast",
    name: "HBR IdeaCast",
    category: "Business & Economy",
  },
  {
    url: "https://www.business-standard.com/rss/home_page_top_stories.rss",
    name: "Business Standard - Home Page",
    category: "Business & Economy",
  },
  {
    url: "https://feeds.npr.org/510313/podcast.xml",
    name: "How I Built This with Guy Raz",
    category: "Business & Economy",
  },
  {
    url: "https://feeds.feedburner.com/Mixergy-main-podcast",
    name: "Startup Stories - Mixergy",
    category: "Business & Economy",
  },
  {
    url: "https://tim.blog/feed/",
    name: "The Blog of Author Tim Ferriss",
    category: "Business & Economy",
  },
  {
    url: "http://thegrowthshow.hubspot.libsynpro.com/",
    name: "The Growth Show",
    category: "Business & Economy",
  },
  {
    url: "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    name: "US Top News and Analysis - CNBC",
    category: "Business & Economy",
  },
  {
    url: "https://finance.yahoo.com/news/rssindex",
    name: "Yahoo Finance",
    category: "Business & Economy",
  },

  // Cars
  {
    url: "https://www.autoblog.com/rss.xml",
    name: "Autoblog",
    category: "Cars",
  },
  {
    url: "https://www.autocarindia.com/RSS/rss.ashx?type=all_bikes",
    name: "Autocar India - All Bike Reviews",
    category: "Cars",
  },
  {
    url: "https://www.autocarindia.com/RSS/rss.ashx?type=all_cars",
    name: "Autocar India - All Car Reviews",
    category: "Cars",
  },
  {
    url: "https://www.autocarindia.com/RSS/rss.ashx?type=News",
    name: "Autocar India - News",
    category: "Cars",
  },
  {
    url: "https://www.autocar.co.uk/rss",
    name: "Autocar UK",
    category: "Cars",
  },
  {
    url: "https://feeds.feedburner.com/BmwBlog",
    name: "BMW BLOG",
    category: "Cars",
  },
  {
    url: "https://www.bikeexif.com/feed",
    name: "Bike EXIF",
    category: "Cars",
  },
  {
    url: "https://www.carbodydesign.com/feed/",
    name: "Car Body Design",
    category: "Cars",
  },
  {
    url: "https://www.carscoops.com/feed/",
    name: "Carscoops",
    category: "Cars",
  },
  {
    url: "https://www.reddit.com/r/formula1/.rss",
    name: "Formula 1 (Reddit)",
    category: "Cars",
  },
  {
    url: "https://jalopnik.com/rss",
    name: "Jalopnik",
    category: "Cars",
  },
  {
    url: "https://www.caranddriver.com/rss/all.xml/",
    name: "Car and Driver - Latest Content",
    category: "Cars",
  },
  {
    url: "https://petrolicious.com/feed",
    name: "Petrolicious",
    category: "Cars",
  },
  {
    url: "http://feeds.feedburner.com/autonews/AutomakerNews",
    name: "Automotive News - Automaker News",
    category: "Cars",
  },
  {
    url: "http://feeds.feedburner.com/autonews/EditorsPicks",
    name: "Automotive News - Editor’s Picks",
    category: "Cars",
  },
  {
    url: "http://feeds.feedburner.com/speedhunters",
    name: "Speedhunters",
    category: "Cars",
  },
  {
    url: "https://www.thetruthaboutcars.com/feed/",
    name: "The Truth About Cars",
    category: "Cars",
  },
  {
    url: "https://bringatrailer.com/feed/",
    name: "Bring a Trailer - Vintage & Classic Cars",
    category: "Cars",
  },

  // Cricket
  {
    url: "http://feeds.bbci.co.uk/sport/cricket/rss.xml",
    name: "BBC Sport - Cricket",
    category: "Cricket",
  },
  {
    url: "http://feeds.feedburner.com/cantbowlcantthrow",
    name: "Can't Bowl Can't Throw Cricket Show",
    category: "Cricket",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCSRQXk5yErn4e14vN76upOw",
    name: "Cricbuzz (YouTube)",
    category: "Cricket",
  },
  {
    url: "https://www.reddit.com/r/Cricket/.rss",
    name: "Cricket (Reddit)",
    category: "Cricket",
  },
  {
    url: "https://rss.acast.com/cricket-unfiltered",
    name: "Cricket Unfiltered",
    category: "Cricket",
  },
  {
    url: "http://www.espncricinfo.com/rss/content/story/feeds/0.xml",
    name: "ESPN Cricinfo - Cricket News",
    category: "Cricket",
  },
  {
    url: "https://www.theguardian.com/sport/cricket/rss",
    name: "The Guardian - Cricket",
    category: "Cricket",
  },
  {
    url: "https://www.theroar.com.au/cricket/feed/",
    name: "The Roar - Cricket",
    category: "Cricket",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=ecbcricket",
    name: "England & Wales Cricket Board (YouTube)",
    category: "Cricket",
  },
  {
    url: "http://feeds.feedburner.com/ndtvsports-cricket",
    name: "NDTV Sports - Cricket",
    category: "Cricket",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCiWrjBhlICf_L_RK5y6Vrxw",
    name: "Pakistan Cricket (YouTube)",
    category: "Cricket",
  },
  {
    url: "https://www.wisden.com/feed",
    name: "Wisden",
    category: "Cricket",
  },
  {
    url: "http://feeds.soundcloud.com/users/soundcloud:users:341034518/sounds.rss",
    name: "Wisden Cricket Weekly",
    category: "Cricket",
  },
  {
    url: "https://www.apartmenttherapy.com/design.rss",
    name: "Apartment Therapy",
    category: "Interior Design",
  },
  {
    url: "http://www.betterlivingthroughdesign.com/feed/",
    name: "Better Living Through Design",
    category: "Interior Design",
  },
  {
    url: "https://www.decor8blog.com/blog?format=rss",
    name: "Blog - decor8",
    category: "Interior Design",
  },
  {
    url: "http://feeds.feedburner.com/core77/blog",
    name: "Core77",
    category: "Interior Design",
  },
  {
    url: "https://design-milk.com/category/interior-design/feed/",
    name: "Design Milk",
    category: "Interior Design",
  },
  {
    url: "http://feeds.feedburner.com/fubiz",
    name: "Fubiz Media",
    category: "Interior Design",
  },
  {
    url: "https://www.idealhome.co.uk/feed",
    name: "Ideal Home",
    category: "Interior Design",
  },
  {
    url: "https://inmyownstyle.com/feed",
    name: "In My Own Style",
    category: "Interior Design",
  },
  {
    url: "https://inhabitat.com/design/feed/",
    name: "Inhabitat",
    category: "Interior Design",
  },
  {
    url: "https://www.reddit.com/r/InteriorDesign/.rss",
    name: "Reddit - Interior Design",
    category: "Interior Design",
  },
  {
    url: "http://www.home-designing.com/feed",
    name: "Interior Design Ideas",
    category: "Interior Design",
  },
  {
    url: "https://www.interiordesign.net/rss/",
    name: "Interior Design Latest",
    category: "Interior Design",
  },
  {
    url: "https://www.dezeen.com/interiors/feed/",
    name: "Interiors - Dezeen",
    category: "Interior Design",
  },
  {
    url: "https://www.lizmarieblog.com/feed/",
    name: "Liz Marie Blog",
    category: "Interior Design",
  },
  {
    url: "https://thedesignfiles.net/feed/",
    name: "The Design Files",
    category: "Interior Design",
  },
  {
    url: "https://theinspiredroom.net/feed/",
    name: "The Inspired Room",
    category: "Interior Design",
  },
  {
    url: "http://feeds.feedburner.com/blogspot/ZBcZ",
    name: "Thrifty Decor Chick",
    category: "Interior Design",
  },
  {
    url: "https://www.trendir.com/feed/",
    name: "Trendir",
    category: "Interior Design",
  },
  {
    url: "http://feeds.feedburner.com/yankodesign",
    name: "Yanko Design",
    category: "Interior Design",
  },
  {
    url: "https://www.yatzer.com/rss.xml",
    name: "Yatzer",
    category: "Interior Design",
  },
  {
    url: "https://www.younghouselove.com/feed/",
    name: "Young House Love",
    category: "Interior Design",
  },
  {
    url: "https://www.decoist.com/feed/",
    name: "Decoist",
    category: "Interior Design",
  },
  {
    url: "https://www.designboom.com/design/feed",
    name: "Designboom",
    category: "Interior Design",
  },
  {
    url: "https://www.sfgirlbybay.com/feed/",
    name: "sfgirlbybay",
    category: "Interior Design",
  },
  {
    url: "https://abeautifulmess.com/feed",
    name: "A Beautiful Mess",
    category: "DIY",
  },
  {
    url: "https://www.apartmenttherapy.com/projects.rss",
    name: "Apartment Therapy - DIY",
    category: "DIY",
  },
  {
    url: "https://hackaday.com/blog/feed/",
    name: "Hackaday",
    category: "DIY",
  },
  {
    url: "https://centsationalstyle.com/feed/",
    name: "Centsational Style",
    category: "DIY",
  },
  {
    url: "https://www.doityourself.com/feed",
    name: "Doityourself.com",
    category: "DIY",
  },
  {
    url: "https://blog.etsy.com/en/feed/",
    name: "Etsy Journal",
    category: "DIY",
  },
  {
    url: "https://www.howtogeek.com/feed/",
    name: "How-To Geek",
    category: "DIY",
  },
  {
    url: "https://www.ikeahackers.net/feed",
    name: "IKEA Hackers",
    category: "DIY",
  },
  {
    url: "https://www.makeuseof.com/feed/",
    name: "MUO",
    category: "DIY",
  },
  {
    url: "http://ohhappyday.com/feed/",
    name: "Oh Happy Day!",
    category: "DIY",
  },
  {
    url: "https://www.wonderhowto.com/rss.xml",
    name: "WonderHowTo",
    category: "DIY",
  },
  {
    url: "https://www.elle.com/rss/fashion.xml/",
    name: "Fashion - ELLE",
    category: "Fashion",
  },
  {
    url: "https://www.theguardian.com/fashion/rss",
    name: "Fashion - The Guardian",
    category: "Fashion",
  },
  {
    url: "https://www.fashionlady.in/category/fashion/feed",
    name: "Fashion – Indian Fashion Blog",
    category: "Fashion",
  },
  {
    url: "https://www.fashionbeans.com/rss-feed/?category=fashion",
    name: "FashionBeans Men's Fashion and Style Feed",
    category: "Fashion",
  },
  {
    url: "https://fashionista.com/.rss/excerpt/",
    name: "Fashionista",
    category: "Fashion",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml",
    name: "NYT > Style",
    category: "Fashion",
  },
  {
    url: "https://www.popsugar.com/fashion/feed",
    name: "POPSUGAR Fashion",
    category: "Fashion",
  },
  {
    url: "https://www.refinery29.com/fashion/rss.xml",
    name: "Refinery29",
    category: "Fashion",
  },
  {
    url: "https://www.yesstyle.com/blog/category/trend-and-style/feed/",
    name: "THE YESSTYLIST",
    category: "Fashion",
  },
  {
    url: "https://www.whowhatwear.com/rss",
    name: "Who What Wear",
    category: "Fashion",
  },
  {
    url: "https://www.101cookbooks.com/feed",
    name: "101 Cookbooks",
    category: "Food",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=bgfilms",
    name: "Babish Culinary Universe",
    category: "Food",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=BonAppetitDotCom",
    name: "Bon Appétit",
    category: "Food",
  },
  {
    url: "https://cnz.to/feed/",
    name: "Chocolate & Zucchini",
    category: "Food",
  },
  {
    url: "https://www.davidlebovitz.com/feed/",
    name: "David Lebovitz",
    category: "Food",
  },
  {
    url: "http://feeds.feedburner.com/food52-TheAandMBlog",
    name: "Food52",
    category: "Food",
  },
  {
    url: "https://greenkitchenstories.com/feed/",
    name: "Green Kitchen Stories",
    category: "Food",
  },
  {
    url: "https://www.howsweeteats.com/feed/",
    name: "How Sweet Eats",
    category: "Food",
  },
  {
    url: "http://joythebaker.com/feed/",
    name: "Joy the Baker",
    category: "Food",
  },
  {
    url: "https://www.thekitchn.com/main.rss",
    name: "Kitchn - Inspiring cooks",
    category: "Food",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=LauraVitalesKitchen",
    name: "Laura in the Kitchen",
    category: "Food",
  },
  {
    url: "https://www.loveandoliveoil.com/feed",
    name: "Love and Olive Oil",
    category: "Food",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/DiningandWine.xml",
    name: "NYT > Food",
    category: "Food",
  },
  {
    url: "https://ohsheglows.com/feed/",
    name: "Oh She Glows",
    category: "Food",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=SeriousEats",
    name: "Serious Eats",
    category: "Food",
  },
  {
    url: "http://feeds.feedburner.com/seriouseats/recipes",
    name: "Serious Eats: Recipes",
    category: "Food",
  },
  {
    url: "http://www.shutterbean.com/feed/",
    name: "Shutterbean",
    category: "Food",
  },
  {
    url: "https://www.skinnytaste.com/feed/",
    name: "Skinnytaste",
    category: "Food",
  },
  {
    url: "https://www.sproutedkitchen.com/home?format=rss",
    name: "Sprouted Kitchen",
    category: "Food",
  },
  {
    url: "https://blog.williams-sonoma.com/feed/",
    name: "Williams-Sonoma Taste",
    category: "Food",
  },
  {
    url: "http://feeds.feedburner.com/smittenkitchen",
    name: "Smitten Kitchen",
    category: "Food",
  },
  {
    url: "https://www.reddit.com/r/Championship/.rss?format=xml",
    name: "EFL Championship",
    category: "Football",
  },
  {
    url: "https://www.reddit.com/r/football/.rss?format=xml",
    name: "Football - The People's Sport",
    category: "Football",
  },
  {
    url: "https://www.goal.com/feeds/en/news",
    name: "Football News, Live Scores, Results & Transfers - Goal.com",
    category: "Football",
  },
  {
    url: "https://www.football365.com/feed",
    name: "Football365",
    category: "Football",
  },
  {
    url: "https://www.soccernews.com/feed",
    name: "Soccer News",
    category: "Football",
  },
  {
    url: "https://awkwardfamilyphotos.com/feed/",
    name: "AwkwardFamilyPhotos.com",
    category: "Funny",
  },
  {
    url: "http://feeds.feedburner.com/CrackedRSS",
    name: "Cracked: All Posts",
    category: "Funny",
  },
  {
    url: "http://feeds.feedburner.com/Explosm",
    name: "Explosm.net",
    category: "Funny",
  },
  {
    url: "http://feeds.feedburner.com/failblog",
    name: "FAIL Blog",
    category: "Funny",
  },
  {
    url: "http://feeds.feedburner.com/icanhascheezburger",
    name: "I Can Has Cheezburger?",
    category: "Funny",
  },
  {
    url: "http://phdcomics.com/gradfeed.php",
    name: "PHD Comics",
    category: "Funny",
  },
  {
    url: "https://www.penny-arcade.com/feed",
    name: "Penny Arcade",
    category: "Funny",
  },
  {
    url: "https://postsecret.com/feed/?alt=rss",
    name: "PostSecret",
    category: "Funny",
  },
  {
    url: "https://www.smbc-comics.com/comic/rss",
    name: "Saturday Morning Breakfast Cereal",
    category: "Funny",
  },
  {
    url: "https://thebloggess.com/feed/",
    name: "The Bloggess",
    category: "Funny",
  },
  {
    url: "http://syndication.thedailywtf.com/TheDailyWtf",
    name: "The Daily WTF",
    category: "Funny",
  },
  {
    url: "http://feeds.feedburner.com/oatmealfeed",
    name: "The Oatmeal - Comics by Matthew Inman",
    category: "Funny",
  },
  {
    url: "https://www.theonion.com/rss",
    name: "The Onion",
    category: "Funny",
  },
  {
    url: "https://xkcd.com/rss.xml",
    name: "xkcd.com",
    category: "Funny",
  },
  {
    url: "https://www.escapistmagazine.com/v2/feed/",
    name: "Escapist Magazine",
    category: "Gaming",
  },
  {
    url: "https://www.eurogamer.net/?format=rss",
    name: "Eurogamer.net",
    category: "Gaming",
  },
  {
    url: "http://feeds.feedburner.com/GamasutraNews",
    name: "Gamasutra News",
    category: "Gaming",
  },
  {
    url: "https://www.gamespot.com/feeds/mashup/",
    name: "GameSpot - All Content",
    category: "Gaming",
  },
  {
    url: "http://feeds.ign.com/ign/all",
    name: "IGN All",
    category: "Gaming",
  },
  {
    url: "https://indiegamesplus.com/feed",
    name: "Indie Games Plus",
    category: "Gaming",
  },
  {
    url: "https://kotaku.com/rss",
    name: "Kotaku",
    category: "Gaming",
  },
  {
    url: "https://www.makeupandbeautyblog.com/feed/",
    name: "Makeup and Beauty Blog - Makeup Reviews, Swatches and How-To Makeup",
    category: "Gaming",
  },
  {
    url: "http://feeds.feedburner.com/psblog",
    name: "PlayStation.Blog",
    category: "Gaming",
  },
  {
    url: "https://www.polygon.com/rss/index.xml",
    name: "Polygon - All",
    category: "Gaming",
  },
  {
    url: "http://feeds.feedburner.com/RockPaperShotgun",
    name: "Rock, Paper, Shotgun",
    category: "Gaming",
  },
  {
    url: "https://store.steampowered.com/feeds/news.xml",
    name: "Steam RSS News Feed",
    category: "Gaming",
  },
  {
    url: "http://feeds.feedburner.com/TheAncientGamingNoob",
    name: "The Ancient Gaming Noob",
    category: "Gaming",
  },
  {
    url: "https://toucharcade.com/community/forums/-/index.rss",
    name: "TouchArcade - iPhone, iPad, Android Games Forum",
    category: "Gaming",
  },
  {
    url: "https://majornelson.com/feed/",
    name: "Xbox's Major Nelson",
    category: "Gaming",
  },
  {
    url: "https://www.reddit.com/r/gaming.rss",
    name: "r/gaming",
    category: "Gaming",
  },
  {
    url: "https://feeds.megaphone.fm/ESP5765452710",
    name: "30 For 30 Podcasts",
    category: "History",
  },
  {
    url: "https://americanhistory.si.edu/blog/feed",
    name: "Blog Feed",
    category: "History",
  },
  {
    url: "https://feeds.feedburner.com/dancarlin/history?format=xml",
    name: "Dan Carlin's Hardcore History",
    category: "History",
  },
  {
    url: "https://www.historyisnowmagazine.com/blog?format=RSS",
    name: "History in 28-minutes",
    category: "History",
  },
  {
    url: "http://www.historynet.com/feed",
    name: "HistoryNet",
    category: "History",
  },
  {
    url: "https://feeds.megaphone.fm/lore",
    name: "Lore",
    category: "History",
  },
  {
    url: "https://feeds.megaphone.fm/revisionisthistory",
    name: "Revisionist History",
    category: "History",
  },
  {
    url: "https://www.thehistoryreader.com/feed/",
    name: "The History Reader",
    category: "History",
  },
  {
    url: "https://feeds.npr.org/510333/podcast.xml",
    name: "Throughline",
    category: "History",
  },
  {
    url: "https://feeds.megaphone.fm/YMRT7068253588",
    name: "You Must Remember This",
    category: "History",
  },
  {
    url: "http://feeds.thememorypalace.us/thememorypalace",
    name: "the memory palace",
    category: "History",
  },
  {
    url: "https://feeds.feedwrench.com/all-shows-devchattv.rss",
    name: "ALL SHOWS - Devchat.tv",
    category: "iOS Development",
  },
  {
    url: "https://albertodebortoli.com/rss/",
    name: "Alberto De Bortoli",
    category: "iOS Development",
  },
  {
    url: "https://augmentedcode.io/feed/",
    name: "Augmented Code",
    category: "iOS Development",
  },
  {
    url: "https://benoitpasquier.com/index.xml",
    name: "Benoit Pasquier - Swift, Data and more",
    category: "iOS Development",
  },
  {
    url: "https://www.fabisevi.ch/feed.xml",
    name: "Fabisevi.ch",
    category: "iOS Development",
  },
  {
    url: "https://mobilea11y.com/index.xml",
    name: "Mobile A11y",
    category: "iOS Development",
  },
  {
    url: "https://feeds.fireside.fm/mtjc/rss",
    name: "More Than Just Code podcast - iOS and Swift development, news and advice",
    category: "iOS Development",
  },
  {
    url: "https://developer.apple.com/news/rss/news.rss",
    name: "News - Apple Developer",
    category: "iOS Development",
  },
  {
    url: "https://oleb.net/blog/atom.xml",
    name: "Ole Begemann",
    category: "iOS Development",
  },
  {
    url: "https://nerdyak.tech/feed.xml",
    name: "Pavel Zak’s dev blog",
    category: "iOS Development",
  },
  {
    url: "https://www.swiftbysundell.com/feed.rss",
    name: "Swift by Sundell",
    category: "iOS Development",
  },
  {
    url: "https://swiftbysundell.com/feed.rss",
    name: "Swift by Sundell",
    category: "iOS Development",
  },
  {
    url: "https://swiftrocks.com/rss.xml",
    name: "SwiftRocks",
    category: "iOS Development",
  },
  {
    url: "https://atomicbird.com/index.xml",
    name: "The Atomic Birdhouse",
    category: "iOS Development",
  },
  {
    url: "https://www.relay.fm/radar/feed",
    name: "Under the Radar",
    category: "iOS Development",
  },
  {
    url: "https://useyourloaf.com/blog/rss.xml",
    name: "Use Your Loaf - iOS Development News & Tips",
    category: "iOS Development",
  },
  {
    url: "https://inessential.com/xml/rss.xml",
    name: "inessential.com",
    category: "iOS Development",
  },
  {
    url: "https://tyler.io/feed/",
    name: "tyler.io",
    category: "iOS Development",
  },
  {
    url: "https://feeds2.feedburner.com/slashfilm",
    name: "/Film",
    category: "Movies",
  },
  {
    url: "https://www.aintitcool.com/node/feed/",
    name: "Ain't It Cool News Feed",
    category: "Movies",
  },
  {
    url: "https://www.comingsoon.net/feed",
    name: "ComingSoon.net",
    category: "Movies",
  },
  {
    url: "https://deadline.com/feed/",
    name: "Deadline",
    category: "Movies",
  },
  {
    url: "https://filmschoolrejects.com/feed/",
    name: "Film School Rejects",
    category: "Movies",
  },
  {
    url: "https://www.firstshowing.net/feed/",
    name: "FirstShowing.net",
    category: "Movies",
  },
  {
    url: "https://www.indiewire.com/feed",
    name: "IndieWire",
    category: "Movies",
  },
  {
    url: "https://reddit.com/r/movies/.rss",
    name: "Movie News and Discussion",
    category: "Movies",
  },
  {
    url: "https://www.bleedingcool.com/movies/feed/",
    name: "Movies",
    category: "Movies",
  },
  {
    url: "https://film.avclub.com/rss",
    name: "The A.V. Club",
    category: "Movies",
  },
  {
    url: "https://variety.com/feed/",
    name: "Variety",
    category: "Movies",
  },
  {
    url: "https://www.billboard.com/articles/rss.xml",
    name: "Billboard",
    category: "Music",
  },
  {
    url: "http://consequenceofsound.net/feed",
    name: "Consequence",
    category: "Music",
  },
  {
    url: "https://edm.com/.rss/full/",
    name: "EDM.com - The Latest Electronic Dance Music News, Reviews & Artists",
    category: "Music",
  },
  {
    url: "http://feeds.feedburner.com/metalinjection",
    name: "Metal Injection",
    category: "Music",
  },
  {
    url: "https://www.musicbusinessworldwide.com/feed/",
    name: "Music Business Worldwide",
    category: "Music",
  },
  {
    url: "http://pitchfork.com/rss/news",
    name: "RSS: News",
    category: "Music",
  },
  {
    url: "http://songexploder.net/feed",
    name: "Song Exploder",
    category: "Music",
  },
  {
    url: "https://www.youredm.com/feed",
    name: "Your EDM",
    category: "Music",
  },
  {
    url: "http://feeds.bbci.co.uk/news/world/rss.xml",
    name: "BBC News - World",
    category: "News",
  },
  {
    url: "http://rss.cnn.com/rss/edition_world.rss",
    name: "CNN.com - RSS Channel - World",
    category: "News",
  },
  {
    url: "https://www.cnbc.com/id/100727362/device/rss/rss.html",
    name: "International: Top News And Analysis",
    category: "News",
  },
  {
    url: "http://feeds.feedburner.com/ndtvnews-world-news",
    name: "NDTV News - World-news",
    category: "News",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    name: "NYT > World News",
    category: "News",
  },
  {
    url: "https://news.google.com/rss",
    name: "Top stories - Google News",
    category: "News",
  },
  {
    url: "http://feeds.washingtonpost.com/rss/world",
    name: "World",
    category: "News",
  },
  {
    url: "https://www.reddit.com/r/worldnews/.rss",
    name: "World News",
    category: "News",
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
    name: "World News Headlines, Latest International News, World Breaking News - Times of India",
    category: "News",
  },
  {
    url: "https://www.theguardian.com/world/rss",
    name: "World news - The Guardian",
    category: "News",
  },
  {
    url: "https://www.yahoo.com/news/rss",
    name: "Yahoo News - Latest News & Headlines",
    category: "News",
  },
  {
    url: "https://affordanything.com/feed/",
    name: "Afford Anything",
    category: "Personal finance",
  },
  {
    url: "https://studentloanhero.com/blog/feed",
    name: "Blog – Student Loan Hero",
    category: "Personal finance",
  },
  {
    url: "https://feeds2.feedburner.com/budgetsaresexy",
    name: "Budgets Are Sexy",
    category: "Personal finance",
  },
  {
    url: "https://www.financialsamurai.com/feed/",
    name: "Financial Samurai",
    category: "Personal finance",
  },
  {
    url: "https://feeds.feedburner.com/Frugalwoods",
    name: "Frugalwoods",
    category: "Personal finance",
  },
  {
    url: "https://www.getrichslowly.org/feed/",
    name: "Get Rich Slowly",
    category: "Personal finance",
  },
  {
    url: "https://www.goodfinancialcents.com/feed/",
    name: "Good Financial Cents®",
    category: "Personal finance",
  },
  {
    url: "https://www.iwillteachyoutoberich.com/feed/",
    name: "I Will Teach You To Be Rich",
    category: "Personal finance",
  },
  {
    url: "https://www.learntotradethemarket.com/feed",
    name: "Learn To Trade The Market",
    category: "Personal finance",
  },
  {
    url: "https://www.makingsenseofcents.com/feed",
    name: "Making Sense Of Cents",
    category: "Personal finance",
  },
  {
    url: "https://millennialmoney.com/feed/",
    name: "Millennial Money",
    category: "Personal finance",
  },
  {
    url: "https://blog.mint.com/feed/",
    name: "MintLife Blog",
    category: "Personal finance",
  },
  {
    url: "https://www.moneycrashers.com/feed/",
    name: "Money Crashers",
    category: "Personal finance",
  },
  {
    url: "https://moneysavingmom.com/feed/",
    name: "Money Saving Mom®",
    category: "Personal finance",
  },
  {
    url: "https://www.moneyunder30.com/feed",
    name: "Money Under 30",
    category: "Personal finance",
  },
  {
    url: "http://feeds.feedburner.com/MoneyNing",
    name: "MoneyNing",
    category: "Personal finance",
  },
  {
    url: "https://mywifequitherjob.com/feed/",
    name: "MyWifeQuitHerJob.com",
    category: "Personal finance",
  },
  {
    url: "http://feeds.feedblitz.com/kitcesnerdseyeview&x=1",
    name: "Nerd's Eye View - Kitces.com",
    category: "Personal finance",
  },
  {
    url: "https://www.nerdwallet.com/blog/feed/",
    name: "NerdWallet",
    category: "Personal finance",
  },
  {
    url: "https://obliviousinvestor.com/feed/",
    name: "Oblivious Investor",
    category: "Personal finance",
  },
  {
    url: "https://reddit.com/r/personalfinance/.rss",
    name: "Personal Finance",
    category: "Personal finance",
  },
  {
    url: "https://www.savingadvice.com/feed/",
    name: "SavingAdvice.com Blog",
    category: "Personal finance",
  },
  {
    url: "https://www.sidehustlenation.com/feed",
    name: "Side Hustle Nation",
    category: "Personal finance",
  },
  {
    url: "https://thecollegeinvestor.com/feed/",
    name: "The College Investor",
    category: "Personal finance",
  },
  {
    url: "https://www.doughroller.net/feed/",
    name: "The Dough Roller",
    category: "Personal finance",
  },
  {
    url: "https://www.thepennyhoarder.com/feed/",
    name: "The Penny Hoarder",
    category: "Personal finance",
  },
  {
    url: "https://wellkeptwallet.com/feed/",
    name: "Well Kept Wallet",
    category: "Personal finance",
  },
  {
    url: "http://feeds.killeraces.com/wisebread",
    name: "Wise Bread",
    category: "Personal finance",
  },

  {
    url: "https://iso.500px.com/feed/",
    name: "500px",
    category: "Photography",
  },
  {
    url: "https://500px.com/editors.rss",
    name: "500px: Editors",
    category: "Photography",
  },
  {
    url: "https://www.bostonglobe.com/rss/bigpicture",
    name: "Big Picture",
    category: "Photography",
  },
  {
    url: "https://www.canonrumors.com/feed/",
    name: "Canon Rumors",
    category: "Photography",
  },
  {
    url: "https://feeds.feedburner.com/DigitalPhotographySchool",
    name: "Digital Photography School",
    category: "Photography",
  },
  {
    url: "https://www.lightstalking.com/feed/",
    name: "Light Stalking",
    category: "Photography",
  },
  {
    url: "https://lightroomkillertips.com/feed/",
    name: "Lightroom Killer Tips",
    category: "Photography",
  },
  {
    url: "http://feeds.feedburner.com/OneBigPhoto",
    name: "One Big Photo",
    category: "Photography",
  },
  {
    url: "https://petapixel.com/feed/",
    name: "PetaPixel",
    category: "Photography",
  },
  {
    url: "http://feeds.feedburner.com/blogspot/WOBq",
    name: "Strobist",
    category: "Photography",
  },
  {
    url: "https://stuckincustoms.com/feed/",
    name: "Stuck in Customs",
    category: "Photography",
  },
  {
    url: "https://feeds.feedburner.com/TheSartorialist",
    name: "The Sartorialist",
    category: "Photography",
  },
  {
    url: "https://medium.com/feed/better-programming",
    name: "Better Programming - Medium",
    category: "Programming",
  },
  {
    url: "https://codeascraft.com/feed/atom/",
    name: "Code as Craft",
    category: "Programming",
  },
  {
    url: "http://feeds.codenewbie.org/cnpodcast.xml",
    name: "CodeNewbie",
    category: "Programming",
  },
  {
    url: "https://feeds.feedburner.com/codinghorror",
    name: "Coding Horror",
    category: "Programming",
  },
  {
    url: "https://completedeveloperpodcast.com/feed/podcast/",
    name: "Complete Developer Podcast",
    category: "Programming",
  },
  {
    url: "https://overreacted.io/rss.xml",
    name: "Dan Abramov's Overreacted Blog",
    category: "Programming",
  },
  {
    url: "https://feeds.simplecast.com/dLRotFGk",
    name: "Developer Tea",
    category: "Programming",
  },
  {
    url: "https://blog.twitter.com/engineering/en_us/blog.rss",
    name: "English (US) - Twitter Engineering",
    category: "Programming",
  },
  {
    url: "https://feeds.twit.tv/floss.xml",
    name: "FLOSS Weekly (Audio)",
    category: "Programming",
  },
  {
    url: "https://engineering.fb.com/feed/",
    name: "Facebook Engineering",
    category: "Programming",
  },
  {
    url: "https://about.gitlab.com/atom.xml",
    name: "GitLab",
    category: "Programming",
  },
  {
    url: "http://feeds.feedburner.com/GDBcode",
    name: "Google Developers Blog",
    category: "Programming",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=GoogleTechTalks",
    name: "Google TechTalks",
    category: "Programming",
  },
  {
    url: "https://medium.com/feed/hackernoon",
    name: "HackerNoon.com - Medium",
    category: "Programming",
  },
  {
    url: "https://feeds.simplecast.com/gvtxUiIf",
    name: "Hanselminutes with Scott Hanselman",
    category: "Programming",
  },
  {
    url: "https://feed.infoq.com",
    name: "InfoQ",
    category: "Programming",
  },
  {
    url: "https://instagram-engineering.com/feed/",
    name: "Instagram Engineering - Medium",
    category: "Programming",
  },
  {
    url: "https://blog.jooq.org/feed",
    name: "Java, SQL and jOOQ.",
    category: "Programming",
  },
  {
    url: "https://blog.jetbrains.com/feed",
    name: "JetBrains Blog",
    category: "Programming",
  },
  {
    url: "https://www.joelonsoftware.com/feed/",
    name: "Joel on Software",
    category: "Programming",
  },
  {
    url: "https://engineering.linkedin.com/blog.rss.html",
    name: "LinkedIn Engineering",
    category: "Programming",
  },
  {
    url: "https://martinfowler.com/feed.atom",
    name: "Martin Fowler",
    category: "Programming",
  },
  {
    url: "https://netflixtechblog.com/feed",
    name: "Netflix TechBlog - Medium",
    category: "Programming",
  },
  {
    url: "https://buffer.com/resources/overflow/rss/",
    name: "Overflow - Buffer Resources",
    category: "Programming",
  },
  {
    url: "https://softwareengineeringdaily.com/category/podcast/feed",
    name: "Podcast – Software Engineering Daily",
    category: "Programming",
  },
  {
    url: "https://www.thirtythreeforty.net/posts/index.xml",
    name: "Posts on &> /dev/null",
    category: "Programming",
  },
  {
    url: "https://engineering.prezi.com/feed",
    name: "Prezi Engineering - Medium",
    category: "Programming",
  },
  {
    url: "http://feeds.feedburner.com/ProgrammingThrowdown",
    name: "Programming Throwdown",
    category: "Programming",
  },
  {
    url: "https://www.thecrazyprogrammer.com/category/programming/feed",
    name: "Programming – The Crazy Programmer",
    category: "Programming",
  },
  {
    url: "https://robertheaton.com/feed.xml",
    name: "Robert Heaton - Blog",
    category: "Programming",
  },
  {
    url: "http://feeds.hanselman.com/ScottHanselman",
    name: "Scott Hanselman's Blog",
    category: "Programming",
  },
  {
    url: "http://scripting.com/rss.xml",
    name: "Scripting News",
    category: "Programming",
  },
  {
    url: "https://m.signalvnoise.com/feed/",
    name: "Signal v. Noise",
    category: "Programming",
  },
  {
    url: "https://slack.engineering/feed",
    name: "Slack Engineering",
    category: "Programming",
  },
  {
    url: "https://feeds.fireside.fm/sdt/rss",
    name: "Software Defined Talk",
    category: "Programming",
  },
  {
    url: "http://feeds.feedburner.com/se-radio",
    name: "Software Engineering Radio",
    category: "Programming",
  },
  {
    url: "https://developers.soundcloud.com/blog/blog.rss",
    name: "SoundCloud Backstage Blog",
    category: "Programming",
  },
  {
    url: "https://labs.spotify.com/feed/",
    name: "Spotify Engineering",
    category: "Programming",
  },
  {
    url: "https://stackabuse.com/rss/",
    name: "Stack Abuse",
    category: "Programming",
  },
  {
    url: "https://stackoverflow.blog/feed/",
    name: "Stack Overflow Blog",
    category: "Programming",
  },
  {
    url: "http://6figuredev.com/feed/rss/",
    name: "The 6 Figure Developer",
    category: "Programming",
  },
  {
    url: "https://medium.com/feed/airbnb-engineering",
    name: "The Airbnb Tech Blog - Medium",
    category: "Programming",
  },
  {
    url: "https://cynicaldeveloper.com/feed/podcast",
    name: "The Cynical Developer",
    category: "Programming",
  },
  {
    url: "https://github.blog/feed/",
    name: "The GitHub Blog",
    category: "Programming",
  },
  {
    url: "https://feeds.transistor.fm/productivity-in-tech-podcast",
    name: "The PIT Show: Reflections and Interviews in the Tech World",
    category: "Programming",
  },
  {
    url: "http://therabbithole.libsyn.com/rss",
    name: "The Rabbit Hole: The Definitive Developer's Podcast",
    category: "Programming",
  },
  {
    url: "https://feeds.simplecast.com/XA_851k3",
    name: "The Stack Overflow Podcast",
    category: "Programming",
  },
  {
    url: "https://feeds.fireside.fm/standup/rss",
    name: "The Standup",
    category: "Programming",
  },
  {
    url: "https://thewomenintechshow.com/category/podcast/feed/",
    name: "The Women in Tech Show: A Technical Podcast",
    category: "Programming",
  },
  {
    url: "https://www.reddit.com/r/programming/.rss",
    name: "Programming",
    category: "Programming",
  },
  {
    url: "http://rss.sciam.com/sciam/60secsciencepodcast",
    name: "60-Second Science",
    category: "Science",
  },
  {
    url: "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    name: "BBC News - Science & Environment",
    category: "Science",
  },
  {
    url: "https://podcasts.files.bbci.co.uk/p002w557.rss",
    name: "Discovery",
    category: "Science",
  },
  {
    url: "https://flowingdata.com/feed",
    name: "FlowingData",
    category: "Science",
  },
  {
    url: "https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/2a195077-f014-41d2-8313-ab190186b4c2/277bcd5c-0a05-4c14-8ba6-ab190186b4d5/podcast.rss",
    name: "Gastropod",
    category: "Science",
  },
  {
    url: "https://gizmodo.com/tag/science/rss",
    name: "Gizmodo",
    category: "Science",
  },
  {
    url: "https://feeds.npr.org/510308/podcast.xml",
    name: "Hidden Brain",
    category: "Science",
  },
  {
    url: "https://feeds.npr.org/510307/podcast.xml",
    name: "Invisibilia",
    category: "Science",
  },
  {
    url: "https://www.sciencedaily.com/rss/all.xml",
    name: "Latest Science News -- ScienceDaily",
    category: "Science",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml",
    name: "NYT > Science",
    category: "Science",
  },
  {
    url: "https://www.nature.com/nature.rss",
    name: "Nature",
    category: "Science",
  },
  {
    url: "https://phys.org/rss-feed/",
    name: "Phys.org - latest science and technology news stories",
    category: "Science",
  },
  {
    url: "https://probablyscience.libsyn.com/rss",
    name: "Probably Science",
    category: "Science",
  },
  {
    url: "http://feeds.wnyc.org/radiolab",
    name: "Radiolab",
    category: "Science",
  },
  {
    url: "https://reddit.com/r/science/.rss",
    name: "Reddit Science",
    category: "Science",
  },
  {
    url: "https://feeds.simplecast.com/y1LF_sn2",
    name: "Sawbones: A Marital Tour of Misguided Medicine",
    category: "Science",
  },
  {
    url: "https://www.wired.com/feed/category/science/latest/rss",
    name: "Science Latest",
    category: "Science",
  },
  {
    url: "http://feeds.gimletmedia.com/ScienceVs",
    name: "Science Vs",
    category: "Science",
  },
  {
    url: "https://sciencebasedmedicine.org/feed/",
    name: "Science-Based Medicine",
    category: "Science",
  },
  {
    url: "http://rss.sciam.com/ScientificAmerican-Global",
    name: "Scientific American Content: Global",
    category: "Science",
  },
  {
    url: "https://shirtloadsofscience.libsyn.com/rss",
    name: "Shirtloads of Science",
    category: "Science",
  },
  {
    url: "https://pa.tedcdn.com/feeds/talks.rss",
    name: "TED Talks Daily (SD video)",
    category: "Science",
  },
  {
    url: "https://podcasts.files.bbci.co.uk/b00snr0w.rss",
    name: "The Infinite Monkey Cage",
    category: "Science",
  },
  {
    url: "http://www.twis.org/feed/",
    name: "This Week in Science – The Kickass Science Podcast",
    category: "Science",
  },
  {
    url: "https://www.reddit.com/r/space/.rss?format=xml",
    name: "/r/space: news, articles and discussion",
    category: "Space",
  },
  {
    url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
    name: "NASA Breaking News",
    category: "Space",
  },
  {
    url: "https://www.newscientist.com/subject/space/feed/",
    name: "New Scientist - Space",
    category: "Space",
  },
  {
    url: "https://www.skyandtelescope.com/feed/",
    name: "Sky & Telescope",
    category: "Space",
  },
  {
    url: "https://www.theguardian.com/science/space/rss",
    name: "Space - The Guardian",
    category: "Space",
  },
  {
    url: "https://www.space.com/feeds/all",
    name: "Space.com",
    category: "Space",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=spacexchannel",
    name: "SpaceX",
    category: "Space",
  },
  {
    url: "http://feeds.bbci.co.uk/sport/rss.xml",
    name: "BBC Sport - Sport",
    category: "Sports",
  },
  {
    url: "https://www.reddit.com/r/sports.rss",
    name: "Reddit Sports",
    category: "Sports",
  },
  {
    url: "http://feeds.skynews.com/feeds/rss/sports.xml",
    name: "Sports News - Latest Sports and Football News - Sky News",
    category: "Sports",
  },
  {
    url: "https://www.sportskeeda.com/feed",
    name: "Sportskeeda",
    category: "Sports",
  },
  {
    url: "https://sports.yahoo.com/rss/",
    name: "Yahoo! Sports - News, Scores, Standings, Rumors, Fantasy Games",
    category: "Sports",
  },
  {
    url: "https://www.espn.com/espn/rss/news",
    name: "www.espn.com - TOP",
    category: "Sports",
  },
  {
    url: "https://avc.com/feed/",
    name: "AVC",
    category: "Startups",
  },
  {
    url: "https://bothsidesofthetable.com/feed",
    name: "Both Sides of the Table - Medium",
    category: "Startups",
  },
  {
    url: "http://feeds.feedburner.com/entrepreneur/latest",
    name: "Entrepreneur",
    category: "Startups",
  },
  {
    url: "https://feld.com/feed",
    name: "Feld Thoughts",
    category: "Startups",
  },
  {
    url: "https://www.forbes.com/entrepreneurs/feed/",
    name: "Forbes - Entrepreneurs",
    category: "Startups",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=GaryVaynerchuk",
    name: "GaryVee",
    category: "Startups",
  },
  {
    url: "https://hnrss.org/frontpage",
    name: "Hacker News: Front Page",
    category: "Startups",
  },
  {
    url: "https://www.inc.com/rss/",
    name: "Inc.com",
    category: "Startups",
  },
  {
    url: "https://www.intercom.com/blog/feed",
    name: "Inside Intercom",
    category: "Startups",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=marieforleo",
    name: "Marie Forleo",
    category: "Startups",
  },
  {
    url: "https://rss.art19.com/masters-of-scale",
    name: "Masters of Scale with Reid Hoffman",
    category: "Startups",
  },
  {
    url: "http://www.aaronsw.com/2002/feeds/pgessays.rss",
    name: "Paul Graham: Essays",
    category: "Startups",
  },
  {
    url: "https://www.producthunt.com/feed",
    name: "Product Hunt — The best new products, every day",
    category: "Startups",
  },
  {
    url: "https://www.quicksprout.com/rss",
    name: "Quick Sprout",
    category: "Startups",
  },
  {
    url: "https://feeds2.feedburner.com/SmallBusinessTrends",
    name: "Small Business Trends",
    category: "Startups",
  },
  {
    url: "http://feeds.feedburner.com/smartpassiveincome",
    name: "Smart Passive Income",
    category: "Startups",
  },
  {
    url: "https://www.springwise.com/feed",
    name: "Springwise",
    category: "Startups",
  },
  {
    url: "https://steveblank.com/feed/",
    name: "Steve Blank",
    category: "Startups",
  },
  {
    url: "https://startupjunkie.libsyn.com/rss",
    name: "The Startup Junkies Podcast",
    category: "Startups",
  },
  {
    url: "https://rss.art19.com/tim-ferriss-show",
    name: "The Tim Ferriss Show",
    category: "Startups",
  },
  {
    url: "http://feeds.feedburner.com/twistvid",
    name: "This Week in Startups - Video",
    category: "Startups",
  },
  {
    url: "https://feeds.feedburner.com/venturebeat/SZYF",
    name: "VentureBeat",
    category: "Startups",
  },
  {
    url: "https://feld.com/archives/tag/blog/feed",
    name: "blog – Feld Thoughts",
    category: "Startups",
  },
  {
    url: "https://atp.fm/rss",
    name: "Accidental Tech Podcast",
    category: "technology",
  },
  {
    url: "https://www.relay.fm/analogue/feed",
    name: "Analog(ue)",
    category: "technology",
  },
  {
    url: "http://feeds.arstechnica.com/arstechnica/index",
    name: "Ars Technica",
    category: "technology",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=CNETTV",
    name: "CNET",
    category: "technology",
  },
  {
    url: "https://www.cnet.com/rss/news/",
    name: "CNET News",
    category: "technology",
  },
  {
    url: "https://www.relay.fm/clockwise/feed",
    name: "Clockwise",
    category: "technology",
  },
  {
    url: "https://gizmodo.com/rss",
    name: "Gizmodo",
    category: "technology",
  },
  {
    url: "https://news.ycombinator.com/rss",
    name: "Hacker News",
    category: "technology",
  },
  {
    url: "https://lifehacker.com/rss",
    name: "Lifehacker",
    category: "technology",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=LinusTechTips",
    name: "Linus Tech Tips",
    category: "technology",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=marquesbrownlee",
    name: "Marques Brownlee",
    category: "technology",
  },
  {
    url: "http://feeds.mashable.com/Mashable",
    name: "Mashable",
    category: "technology",
  },
  {
    url: "https://readwrite.com/feed/",
    name: "ReadWrite",
    category: "technology",
  },
  {
    url: "https://feeds.megaphone.fm/replyall",
    name: "Reply All",
    category: "technology",
  },
  {
    url: "https://www.relay.fm/rocket/feed",
    name: "Rocket",
    category: "technology",
  },
  {
    url: "http://rss.slashdot.org/Slashdot/slashdotMain",
    name: "Slashdot",
    category: "technology",
  },
  {
    url: "http://stratechery.com/feed/",
    name: "Stratechery by Ben Thompson",
    category: "technology",
  },
  {
    url: "http://feeds.feedburner.com/TechCrunch",
    name: "TechCrunch",
    category: "technology",
  },
  {
    url: "https://www.blog.google/rss/",
    name: "The Keyword",
    category: "technology",
  },
  {
    url: "https://thenextweb.com/feed/",
    name: "The Next Web",
    category: "technology",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=TheVerge",
    name: "The Verge",
    category: "technology",
  },
  {
    url: "https://www.theverge.com/rss/index.xml",
    name: "The Verge - All Posts",
    category: "technology",
  },
  {
    url: "https://feeds.megaphone.fm/vergecast",
    name: "The Vergecast",
    category: "technology",
  },
  {
    url: "https://feeds.twit.tv/twit.xml",
    name: "This Week in Tech (Audio)",
    category: "technology",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?user=unboxtherapy",
    name: "Unbox Therapy",
    category: "technology",
  },
  {
    url: "https://www.engadget.com/rss.xml",
    name: "Engadget",
    category: "technology",
  },
  {
    url: "https://www.bleedingcool.com/tv/feed/",
    name: "TV",
    category: "television",
  },
  {
    url: "https://www.tvfanatic.com/rss.xml",
    name: "TV Fanatic",
    category: "television",
  },
  {
    url: "https://tvline.com/feed/",
    name: "TVLine",
    category: "television",
  },
  {
    url: "https://reddit.com/r/television/.rss",
    name: "Television News and Discussion",
    category: "television",
  },
  {
    url: "https://tv.avclub.com/rss",
    name: "The A.V. Club",
    category: "television",
  },
  {
    url: "http://feeds.feedburner.com/thetvaddict/AXob",
    name: "the TV addict",
    category: "television",
  },
  {
    url: "http://feeds.bbci.co.uk/sport/tennis/rss.xml",
    name: "BBC Sport - Tennis",
    category: "tennis",
  },
  {
    url: "https://feed.podbean.com/essentialtennis/feed.xml",
    name: "Essential Tennis Podcast - Instruction, Lessons, Tips",
    category: "tennis",
  },
  {
    url: "http://www.grandslamfantasytennis.com/feed/?x=1",
    name: "Grand Slam Fantasy Tennis",
    category: "tennis",
  },
  {
    url: "https://www.atptour.com/en/media/rss-feed/xml-feed",
    name: "Tennis - ATP World Tour",
    category: "tennis",
  },
  {
    url: "https://www.reddit.com/r/tennis/.rss",
    name: "Tennis News & Discussion",
    category: "tennis",
  },
  {
    url: "https://www.perfect-tennis.com/feed/",
    name: "peRFect Tennis",
    category: "tennis",
  },
  {
    url: "https://www.espn.com/espn/rss/tennis/news",
    name: "www.espn.com - TENNIS",
    category: "tennis",
  },
  {
    url: "https://www.atlasobscura.com/feeds/latest",
    name: "Atlas Obscura - Latest Articles and Places",
    category: "travel",
  },
  {
    url: "https://www.livelifetravel.world/feed/",
    name: "Live Life Travel",
    category: "travel",
  },
  {
    url: "https://www.lonelyplanet.com/news/feed/atom/",
    name: "Lonely Planet Travel News",
    category: "travel",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml",
    name: "NYT > Travel",
    category: "travel",
  },
  {
    url: "https://www.nomadicmatt.com/travel-blog/feed/",
    name: "Nomadic Matt's Travel Site",
    category: "travel",
  },
  {
    url: "https://www.theguardian.com/uk/travel/rss",
    name: "Travel - The Guardian",
    category: "travel",
  },
  {
    url: "https://www.smashingmagazine.com/feed",
    name: "Articles on Smashing Magazine — For Web Designers And Developers",
    category: "UI/UX",
  },
  {
    url: "http://boxesandarrows.com/rss/",
    name: "Boxes and Arrows",
    category: "UI/UX",
  },
  {
    url: "https://www.designernews.co/?format=rss",
    name: "Designer News Feed",
    category: "UI/UX",
  },
  {
    url: "https://www.invisionapp.com/inside-design/feed",
    name: "Inside Design",
    category: "UI/UX",
  },
  {
    url: "https://feeds.feedburner.com/JustCreativeDesignBlog",
    name: "JUST™ Creative",
    category: "UI/UX",
  },
  {
    url: "https://www.nngroup.com/feed/rss/",
    name: "NN/g latest articles and announcements",
    category: "UI/UX",
  },
  {
    url: "https://uxstudioteam.com/ux-blog/feed/",
    name: "UX Blog – UX Studio",
    category: "UI/UX",
  },
  {
    url: "https://uxdesign.cc/feed",
    name: "UX Collective - Medium",
    category: "UI/UX",
  },
  {
    url: "https://uxmovement.com/feed/",
    name: "UX Movement",
    category: "UI/UX",
  },
  {
    url: "https://usabilitygeek.com/feed/",
    name: "Usability Geek",
    category: "UI/UX",
  },
  {
    url: "https://www.reddit.com/r/userexperience/.rss",
    name: "User Experience",
    category: "UI/UX",
  },
  {
    url: "https://alistapart.com/main/feed/",
    name: "A List Apart: The Full Feed",
    category: "Web Development",
  },
  {
    url: "https://css-tricks.com/feed/",
    name: "CSS-Tricks",
    category: "Web Development",
  },
  {
    url: "https://www.codewall.co.uk/feed/",
    name: "Code Wall",
    category: "Web Development",
  },
  {
    url: "https://davidwalsh.name/feed",
    name: "David Walsh Blog",
    category: "Web Development",
  },
  {
    url: "https://hacks.mozilla.org/feed/",
    name: "Mozilla Hacks – the Web developer blog",
    category: "Web Development",
  },
  {
    url: "https://gosink.in/rss/",
    name: "Sink In - Tech and Travel",
    category: "Web Development",
  },
  {
    url: "https://developers.google.com/web/updates/rss.xml",
    name: "Updates",
    category: "Web Development",
  },
];
