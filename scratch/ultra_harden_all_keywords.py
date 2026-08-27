import os
import re

def ultra_harden_all_keywords():
    silo_path = "/Users/vikasyewle/goelgangalegendcounty/src/data/siloData.ts"
    with open(silo_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Exhaustive 24-Silo Keyword Matrix covering all permutations, typos, configurations, localities, sports, and Marathi terms
    keyword_matrix = {
        "3bhk-flats-bavdhan": (
            "3 BHK flats in Bavdhan, luxury flats in Bavdhan, 3 BHK Pune, Goel Ganga Legend County 3BHK, "
            "Goel Ganga Legends County, Ganga Legend County 3 BHK, Ganga Legends Bavdhan, Goel Ganga Bavdhan 3BHK, "
            "Bavdhan Budruk 3BHK, Bavdhan Khurd flats, NDA Road flats, Chandni Chowk 3BHK, 3.5 BHK flats Pune, "
            "ready possession 3 BHK Bavdhan, under construction 3 BHK Pune, stadium view apartments Bavdhan, "
            "flats near Ryan International Bavdhan, flats near Chellaram Hospital, luxury apartments near Kothrud, "
            "बावधन पुणे फ्लॅट्स 3 BHK, गोएल गंगा लीजेंड काउंटी बावधन, गोएल गंगा लीजेंड्स काउंटी, गंगा लीजेंड बावधन, "
            "MahaRERA P52100054578, SBI approved projects Bavdhan, HDFC home loan Ganga Legend"
        ),
        "2bhk-flats-bavdhan-pune": (
            "2 BHK in Bavdhan, buy 2 BHK in Bavdhan, Goel Ganga Legend County 2BHK price, Goel Ganga Legends County 2BHK, "
            "premium flats Bavdhan, smart homes Bavdhan, Bavdhan Khurd flats, Bavdhan Budruk 2BHK, flats near Ryan International, "
            "Ganga Legend 2 BHK floor plan, Ganga Legends County price list, flats near Chandni Chowk under 1 Cr, "
            "IT professional housing near Hinjewadi, compact luxury flats Pune West, rental yield property Bavdhan, "
            "बावधन 2 BHK फ्लॅट्स, गोएल गंगा लीजेंड्स काउंटी 2 BHK, गंगा लीजेंड्स बावधन पुणे, "
            "MahaRERA P52100054578, PMC water supply flats Bavdhan"
        ),
        "luxury-projects-bavdhan": (
            "best project in Bavdhan, top residential project Bavdhan, luxury gated community Bavdhan, "
            "Goel Ganga Legend County reviews, Goel Ganga Legends County Bavdhan, premium township Bavdhan, "
            "NDA Pashan Road luxury apartments, Kothrud extension luxury homes, Chandni Chowk premium residences, "
            "Ganga Legend County master layout, 30 acre township West Pune, sports township Pune, "
            "पुणे लक्झरी प्रोजेक्ट्स, गोएल गंगा लीजेंड काउंटी रिव्ह्यू, बावधन मधील सर्वोत्तम प्रोजेक्ट, "
            "MahaRERA P52100054578, Mivan construction flats Pune"
        ),
        "investment-flats-bavdhan-pune": (
            "real estate investment Bavdhan, property investment Pune West, high ROI flats Bavdhan, "
            "buy flat in Bavdhan, appreciation property Bavdhan, Pune Ring Road investment, West Pune rental yield, "
            "Goel Ganga Legend County investment potential, Goel Ganga Legends County ROI, Hinjewadi commute housing investment, "
            "commercial appreciation Bavdhan, NRI property investment Pune, capital growth corridor Bavdhan, "
            "बावधन प्रॉपर्टी इन्व्हेस्टमेंट, वेस्ट पुणे रिअल इस्टेट गुंतवणूक, "
            "MahaRERA P52100054578, pre approved home loans Pune"
        ),
        "sports-township-pune": (
            "sports township Pune, Goel Ganga Legend County sports, Goel Ganga Legends County sports arena, "
            "football academy Pune, swimming academy Bavdhan, sports amenities Bavdhan, tennis court Bavdhan, "
            "MS Dhoni Tagda Raho Pune, Michael Phelps swimming Pune, South United Football Pune, 12.5 acre sports complex, "
            "residential project with Olympic pool Pune, stadium life Bavdhan, fitness township Pune West, "
            "स्पोर्ट्स टाउनशिप पुणे, गोएल गंगा लीजेंड्स स्पोर्ट्स अकॅडमी, धोनी फिटनेस सेंटर पुणे, मायकेल फेल्प्स स्विमिंग पुणे, "
            "MahaRERA P52100054578"
        ),
        "luxury-apartments-chandni-chowk": (
            "luxury apartments near Chandni Chowk, premium flats Bavdhan, Goel Ganga Legend County location, "
            "Goel Ganga Legends County Chandni Chowk, flats near Chandni Chowk flyover, Bavdhan near Highway bypass, "
            "Paud Road luxury flats, Kothrud touchpoint apartments, signal free commute Baner Bavdhan, "
            "चांदणी चौक लक्झरी फ्लॅट्स, चांदणी चौक जवळील घरे, गोएल गंगा लीजेंड काउंटी, "
            "MahaRERA P52100054578"
        ),
        "michael-phelps-swimming-pune": (
            "Michael Phelps Swimming Academy Pune, swimming coaching Bavdhan, Olympic size pool Pune, "
            "sports academy Ganga Legend County, Goel Ganga Legends County swimming, swimming classes West Pune, "
            "heated swimming pool apartments Pune, competitive swim training Bavdhan, Phelps global protocol Pune, "
            "मायकेल फेल्प्स स्विमिंग अकॅडमी पुणे, जलतरण प्रशिक्षण बावधन, "
            "MahaRERA P52100054578"
        ),
        "tagda-raho-dhoni-pune": (
            "Tagda Raho MS Dhoni Pune, functional fitness Bavdhan, MS Dhoni fitness center Pune, "
            "Ganga Legend County gym, Goel Ganga Legends County fitness, athletic training West Pune, "
            "traditional Indian fitness protocol Pune, Gada and Mudgar workout Bavdhan, celebrity gym Pune, "
            "तगडा रहो धोनी पुणे, एमएस धोनी फिटनेस सेंटर बावधन, "
            "MahaRERA P52100054578"
        ),
        "3.5-bhk-flats-bavdhan": (
            "3.5 BHK flats in Bavdhan, 3.5 BHK luxury homes Pune, Ganga Legend County 3.5BHK, "
            "Goel Ganga Legends County 3.5 BHK, work from home luxury flats Pune, study room luxury apartments Bavdhan, "
            "dual master suite flats Pune, 1440 sq ft carpet area flats Bavdhan, elite series Ganga Legend, "
            "3.5 BHK फ्लॅट्स बावधन पुणे, वर्क फ्रॉम होम लक्झरी घरे, "
            "MahaRERA P52100054578"
        ),
        "schools-hospitals-near-bavdhan": (
            "schools near Bavdhan, Ryan International School Bavdhan, Chellaram Hospital Bavdhan, "
            "hospitals in Bavdhan Pune, family living Bavdhan, schools near Chandni Chowk, Sri Chaitanya Techno School Bavdhan, "
            "Sanskriti School Pune West, Sahyadri Hospital Kothrud, pediatric hospital Bavdhan, "
            "बावधन शाळा आणि हॉस्पिटल्स, रायन इंटरनॅशनल बावधन, चेलाराम हॉस्पिटल, "
            "MahaRERA P52100054578"
        ),
        "rera-legal-compliance-bavdhan": (
            "MahaRERA P52100054578, Goel Ganga Legend County RERA certificate, Goel Ganga Legends County legal status, "
            "legal title Bavdhan flats, PMRDA approved projects Bavdhan, PMC municipal sanctioned layout Pune, "
            "bank loan approved projects Pune, SBI APF number Ganga Legend, title clearance certificate Bavdhan, "
            "रेरा मान्यताप्राप्त प्रोजेक्ट्स पुणे, महारेरा P52100054578, कायदेशीर तपासणी बावधन फ्लॅट्स"
        ),
        "pune-real-estate-market": (
            "Pune real estate market 2026, West Pune property trends, luxury housing Pune, "
            "buy flat in Pune, real estate appreciation Pune, property rates in Pune 2026, "
            "Goel Ganga Legend County market analysis, Goel Ganga Legends County Pune, top builders in Pune, "
            "पुणे रिअल इस्टेट मार्केट 2026, पुणे प्रॉपर्टी ट्रेंड्स, "
            "MahaRERA P52100054578"
        ),
        "west-pune-real-estate-market": (
            "West Pune real estate market, Bavdhan vs Baner property, luxury residential corridor Pune West, "
            "NDA road property rates, Kothrud expansion real estate, low density living West Pune, "
            "Goel Ganga Legend County West Pune, Goel Ganga Legends County, "
            "वेस्ट पुणे प्रॉपर्टी मार्केट, बाणेर वि बावधन दर, "
            "MahaRERA P52100054578"
        ),
        "luxury-real-estate-baner-pashan-link-road": (
            "luxury real estate Baner Pashan link road, Baner Pashan flats vs Bavdhan, premium homes Baner Pashan, "
            "low density flats Pune West, quiet luxury residences Pashan, traffic comparison Baner Pashan Bavdhan, "
            "Goel Ganga Legend County vs Baner Pashan, Goel Ganga Legends County, "
            "बाणेर पाषाण लिंक रोड फ्लॅट्स, पाषाण लक्झरी घरे, "
            "MahaRERA P52100054578"
        ),
        "luxury-flats-kharadi-vs-bavdhan-pune": (
            "Kharadi vs Bavdhan real estate, East Pune vs West Pune property, IT corridor flats Pune, "
            "luxury flats Kharadi vs Bavdhan, air quality Kharadi vs Bavdhan, rental yield Kharadi vs Bavdhan, "
            "Goel Ganga Legend County vs Kharadi luxury projects, Goel Ganga Legends County, "
            "खराडी वि बावधन पुणे, पूर्व पुणे वि पश्चिम पुणे, "
            "MahaRERA P52100054578"
        ),
        "luxury-homes-koregaon-park-vs-bavdhan": (
            "Koregaon Park vs Bavdhan luxury homes, quiet luxury residences Pune, green corridor flats Pune, "
            "luxury apartments Koregaon Park vs Bavdhan, price comparison Koregaon Park Bavdhan, "
            "Goel Ganga Legend County ultra luxury, Goel Ganga Legends County, "
            "कोरेगाव पार्क वि बावधन, शांत लक्झरी घरे पुणे, "
            "MahaRERA P52100054578"
        ),
        "luxury-apartments-baner-vs-bavdhan": (
            "Baner vs Bavdhan luxury apartments, traffic congestion Baner vs Bavdhan, sports amenities township Pune, "
            "price per sq ft Baner vs Bavdhan, Goel Ganga Legend County vs Baner high rises, Goel Ganga Legends County, "
            "बाणेर वि बावधन लक्झरी फ्लॅट्स, बाणेर ट्रॅफिक वि बावधन, "
            "MahaRERA P52100054578"
        ),
        "luxury-flats-kothrud-vs-bavdhan-pune": (
            "Kothrud vs Bavdhan flats, Kothrud extension luxury property, spacious flats near Kothrud, "
            "redevelopment Kothrud vs new township Bavdhan, 5 mins from Kothrud flats, "
            "Goel Ganga Legend County Kothrud touchpoint, Goel Ganga Legends County, "
            "कोथरूड वि बावधन फ्लॅट्स, कोथरूड जवळील नवीन टाउनशिप, "
            "MahaRERA P52100054578"
        ),
        "luxury-3bhk-flats-pune": (
            "luxury 3 BHK flats Pune, best 3 BHK in West Pune, stadium life Ganga Legend, "
            "3 BHK under construction Pune, 3 BHK ready to move Bavdhan, 3 BHK with hill view Pune, "
            "Goel Ganga Legend County 3 BHK, Goel Ganga Legends County 3BHK, "
            "लक्झरी 3 BHK फ्लॅट्स पुणे, सर्वोत्कृष्ट 3 BHK घरे, "
            "MahaRERA P52100054578"
        ),
        "best-investment-property-pune": (
            "best investment property in Pune, high rental yield flats Pune, commercial and residential growth West Pune, "
            "capital appreciation real estate Pune 2026, township investment Pune, "
            "Goel Ganga Legend County investment reviews, Goel Ganga Legends County ROI, "
            "बेस्ट इन्व्हेस्टमेंट प्रॉपर्टी पुणे, सर्वाधिक परतावा देणारे फ्लॅट्स, "
            "MahaRERA P52100054578"
        ),
        "sports-township-pune-stadium-life": (
            "sports township Pune stadium life, stadium view apartments Bavdhan, sports academy residences Pune, "
            "live inside a stadium Pune, sports facilities gated community Bavdhan, "
            "Goel Ganga Legend County stadium life, Goel Ganga Legends County, "
            "स्टेडियम लाईफ स्पोर्ट्स टाउनशिप पुणे, खेळाडूंच्या सोयींसह घरे, "
            "MahaRERA P52100054578"
        ),
        "luxury-4bhk-flats-pune": (
            "luxury 4 BHK flats Pune, combined 4 BHK Bavdhan, duplex penthouse West Pune, "
            "4 BHK luxury residences Bavdhan, expansive luxury homes Pune, large family flats Bavdhan, "
            "Goel Ganga Legend County 4 BHK, Goel Ganga Legends County 4BHK, "
            "लक्झरी 4 BHK फ्लॅट्स पुणे, ड्युप्लेक्स घरे बावधन, "
            "MahaRERA P52100054578"
        ),
        "luxury-5bhk-duplex-penthouse-flats-pune": (
            "luxury 5 BHK flats Pune, duplex penthouse Bavdhan, sky villa Pune West, "
            "presidential suite residences Bavdhan, 5 BHK luxury penthouse Pune, double height ceiling flats Bavdhan, "
            "Goel Ganga Legend County penthouse, Goel Ganga Legends County sky villa, "
            "लक्झरी 5 BHK पेंटहाउस पुणे, स्काय व्हिला बावधन, "
            "MahaRERA P52100054578"
        ),
        "luxury-residences-pune-west": (
            "luxury residences Pune West, branded township Bavdhan, gated community West Pune, "
            "Goel Ganga Developments luxury homes, Goel Ganga Legend County, Goel Ganga Legends County, "
            "high end residential projects Pune, NDA road luxury homes, "
            "लक्झरी रेसिडेन्सेस पुणे वेस्ट, गोएल गंगा डेव्हलपमेंट्स, "
            "MahaRERA P52100054578"
        )
    }

    # Replace keywords in each silo
    for slug, kw in keyword_matrix.items():
        pattern = rf"(slug:\s*'{slug}',[\s\S]*?keywords:\s*')([^']*)(')"
        content = re.sub(pattern, rf"\g<1>{kw}\g<3>", content)

    with open(silo_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully hardened keywords across all {len(keyword_matrix)} silos in siloData.ts.")

if __name__ == "__main__":
    ultra_harden_all_keywords()
