import os
import re

def enrich_pune_silo_data():
    silo_path = "/Users/vikasyewle/goelgangalegendcounty/src/data/siloData.ts"
    with open(silo_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Regional / Hyper-Local Keyword Clusters
    pune_kw_boost = {
        "3bhk-flats-bavdhan": "3 BHK flats in Bavdhan, luxury flats in Bavdhan, 3 BHK Pune, Goel Ganga Legend County 3BHK, Bavdhan Budruk 3BHK, NDA Road flats, Chandni Chowk 3BHK, 3.5 BHK flats Pune, बावधन पुणे फ्लॅट्स 3 BHK, गोएल गंगा लीजेंड काउंटी, MahaRERA P52100054578",
        "2bhk-flats-bavdhan-pune": "2 BHK in Bavdhan, buy 2 BHK in Bavdhan, Goel Ganga Legend County 2BHK price, premium flats Bavdhan, smart homes Bavdhan, Bavdhan Khurd flats, flats near Ryan International, बावधन 2 BHK फ्लॅट्स, MahaRERA P52100054578",
        "luxury-projects-bavdhan": "best project in Bavdhan, top residential project Bavdhan, luxury gated community Bavdhan, Goel Ganga Legend County reviews, premium township Bavdhan, NDA Pashan Road luxury apartments, Kothrud extension luxury homes, पुणे लक्झरी प्रोजेक्ट्स, MahaRERA P52100054578",
        "investment-flats-bavdhan-pune": "real estate investment Bavdhan, property investment Pune West, high ROI flats Bavdhan, buy flat in Bavdhan, appreciation property Bavdhan, Pune Ring Road investment, West Pune rental yield, बावधन प्रॉपर्टी इन्व्हेस्टमेंट, MahaRERA P52100054578",
        "sports-township-pune": "sports township Pune, Goel Ganga Legend County sports, football academy Pune, swimming academy Bavdhan, sports amenities Bavdhan, tennis court Bavdhan, MS Dhoni Tagda Raho Pune, Michael Phelps swimming Pune, स्पोर्ट्स टाउनशिप पुणे",
        "luxury-apartments-chandni-chowk": "luxury apartments near Chandni Chowk, premium flats Bavdhan, Goel Ganga Legend County location, flats near Chandni Chowk, Bavdhan near Highway, Paud Road luxury flats, चांदणी चौक फ्लॅट्स",
        "michael-phelps-swimming-pune": "Michael Phelps Swimming Academy Pune, swimming coaching Bavdhan, Olympic size pool Pune, sports academy Ganga Legend County, swimming classes West Pune, मायकेल फेल्प्स स्विमिंग अकॅडमी पुणे",
        "tagda-raho-dhoni-pune": "Tagda Raho MS Dhoni Pune, functional fitness Bavdhan, MS Dhoni fitness center Pune, Ganga Legend County gym, athletic training West Pune, तगडा रहो धोनी पुणे",
        "3.5-bhk-flats-bavdhan": "3.5 BHK flats in Bavdhan, 3.5 BHK luxury homes Pune, Ganga Legend County 3.5BHK, work from home luxury flats Pune, study room luxury apartments Bavdhan, 3.5 BHK फ्लॅट्स बावधन पुणे",
        "schools-hospitals-near-bavdhan": "schools near Bavdhan, Ryan International School Bavdhan, Chellaram Hospital Bavdhan, hospitals in Bavdhan Pune, family living Bavdhan, schools near Chandni Chowk, बावधन शाळा आणि हॉस्पिटल्स",
        "rera-legal-compliance-bavdhan": "MahaRERA P52100054578, Goel Ganga Legend County RERA, legal title Bavdhan flats, PMRDA approved projects Bavdhan, bank loan approved projects Pune, रेरा मान्यताप्राप्त प्रोजेक्ट्स पुणे",
        "pune-real-estate-market": "Pune real estate market 2026, West Pune property trends, luxury housing Pune, buy flat in Pune, real estate appreciation Pune, पुणे रिअल इस्टेट मार्केट 2026",
        "west-pune-real-estate-market": "West Pune real estate market, Bavdhan vs Baner property, luxury residential corridor Pune West, NDA road property rates, वेस्ट पुणे प्रॉपर्टी मार्केट",
        "luxury-real-estate-baner-pashan-link-road": "luxury real estate Baner Pashan link road, Baner Pashan flats vs Bavdhan, premium homes Baner Pashan, low density flats Pune West, बाणेर पाषाण लिंक रोड फ्लॅट्स",
        "luxury-flats-kharadi-vs-bavdhan-pune": "Kharadi vs Bavdhan real estate, East Pune vs West Pune property, IT corridor flats Pune, luxury flats Kharadi vs Bavdhan, खराडी वि बावधन पुणे",
        "luxury-homes-koregaon-park-vs-bavdhan": "Koregaon Park vs Bavdhan luxury homes, quiet luxury residences Pune, green corridor flats Pune, luxury apartments Koregaon Park vs Bavdhan, कोरेगाव पार्क वि बावधन",
        "luxury-apartments-baner-vs-bavdhan": "Baner vs Bavdhan luxury apartments, traffic congestion Baner vs Bavdhan, sports amenities township Pune, बाणेर वि बावधन लक्झरी फ्लॅट्स",
        "luxury-flats-kothrud-vs-bavdhan-pune": "Kothrud vs Bavdhan flats, Kothrud extension luxury property, spacious flats near Kothrud, कोथरूड वि बावधन फ्लॅट्स",
        "luxury-3bhk-flats-pune": "luxury 3 BHK flats Pune, best 3 BHK in West Pune, stadium life Ganga Legend, 3 BHK under construction Pune, लक्झरी 3 BHK फ्लॅट्स पुणे",
        "best-investment-property-pune": "best investment property in Pune, high rental yield flats Pune, commercial and residential growth West Pune, बेस्ट इन्व्हेस्टमेंट प्रॉपर्टी पुणे",
        "sports-township-pune-stadium-life": "sports township Pune stadium life, stadium view apartments Bavdhan, sports academy residences Pune, स्टेडियम लाईफ स्पोर्ट्स टाउनशिप पुणे",
        "luxury-4bhk-flats-pune": "luxury 4 BHK flats Pune, combined 4 BHK Bavdhan, duplex penthouse West Pune, 4 BHK luxury residences Bavdhan, लक्झरी 4 BHK फ्लॅट्स पुणे",
        "luxury-5bhk-duplex-penthouse-flats-pune": "luxury 5 BHK flats Pune, duplex penthouse Bavdhan, sky villa Pune West, presidential suite residences Bavdhan, लक्झरी 5 BHK पेंटहाउस पुणे",
        "luxury-residences-pune-west": "luxury residences Pune West, branded township Bavdhan, gated community West Pune, Goel Ganga Developments luxury homes, लक्झरी रेसिडेन्सेस पुणे वेस्ट"
    }

    # Replace keywords in each silo
    for slug, kw in pune_kw_boost.items():
        # Match keywords line for this slug
        pattern = rf"(slug:\s*'{slug}',[\s\S]*?keywords:\s*')([^']*)(')"
        content = re.sub(pattern, rf"\g<1>{kw}\g<3>", content)

    with open(silo_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Enriched all 24 silos in siloData.ts with hyper-local Pune and regional keywords.")

if __name__ == "__main__":
    enrich_pune_silo_data()
