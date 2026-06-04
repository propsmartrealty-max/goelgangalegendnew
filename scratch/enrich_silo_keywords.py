import re
import os

silo_data_path = 'src/data/siloData.ts'

enriched_data = {
  '3bhk-flats-bavdhan': {
    'content': [
      'If you are looking to <strong>buy 3 BHK flats in Bavdhan Pune</strong>, Goel Ganga Legend County offers premium residences engineered for luxury living. As the demand for spacious homes rises in the western corridor, our <strong>3 BHK apartments in Bavdhan</strong> stand out as the perfect choice for modern families seeking a balanced lifestyle.',
      'Strategically located near <a href="/luxury-apartments-chandni-chowk">Chandni Chowk</a> in Pune, these premium residences ensure seamless connectivity to the Hinjewadi IT Park and Kothrud. The project is an integrated <a href="/rera-legal-compliance-bavdhan">gated community in Bavdhan Pune</a> that features a massive 12.5-acre professional <a href="/sports-township-pune">sports township Pune</a> infrastructure, including tennis courts and cricket nets, making it the best <a href="/investment-flats-bavdhan-pune">property in Bavdhan Pune</a> for sports enthusiasts.',
      'Each of the <strong>3 BHK flats in Bavdhan</strong> at Ganga Legend County is designed with Vastu compliance in mind, featuring double-aspect balconies with breathtaking views of the NDA hills. If you are looking for <a href="/luxury-projects-bavdhan">new residential projects in Bavdhan Pune</a> that offer premium build quality, high rental yields, and unmatched appreciation potential, this is the ultimate destination.'
    ]
  },
  '2bhk-flats-bavdhan-pune': {
    'content': [
      'For home buyers seeking premium <strong>2 BHK flats in Bavdhan Pune</strong>, Goel Ganga Legend County presents an exceptional residential opportunity. These smart and spacious <strong>2 BHK apartments in Bavdhan</strong> are tailored for young IT professionals and small families who want to experience premium community living.',
      'Our premium <strong>2 BHK in Bavdhan Pune</strong> is strategically situated near NDA Road and the Mumbai-Bangalore Highway, offering quick transit to Hinjewadi, Baner, and Kothrud. As part of a luxury <a href="/rera-legal-compliance-bavdhan">gated community in Bavdhan</a>, these <a href="/luxury-projects-bavdhan">flats in Bavdhan</a> offer top-tier security, municipal water supply, and uninterrupted electricity backup.',
      'Investing in a <strong>2 BHK flat in Bavdhan Pune</strong> at Ganga Legend County ensures a high-yield asset in one of West Pune\'s fastest-growing corridors. With corporate tenants constantly looking for homes near Hinjewadi, these apartments command premium rents, making it a highly profitable <a href="/investment-flats-bavdhan-pune">real estate investment in Bavdhan Pune</a>.'
    ]
  },
  'luxury-projects-bavdhan': {
    'content': [
      'Among the top <strong>luxury projects in Bavdhan Pune</strong>, Goel Ganga Legend County stands as a landmark of premium planning and design. Spread over 30 acres of land, this premier development is the most sought-after <strong>luxury residential project in Bavdhan</strong> for buyers seeking an elite lifestyle.',
      'Unlike standalone buildings, our <strong>luxury apartments in Bavdhan Pune</strong> are situated within an expansive township featuring 12.5 acres of dedicated sports facilities. The project integrates MS Dhoni\'s <a href="/tagda-raho-dhoni-pune">Tagda Raho</a> fitness protocol and the <a href="/michael-phelps-swimming-pune">Michael Phelps Swimming Academy</a>, raising the bar for <strong>premium projects in Bavdhan</strong>.',
      'If you are looking for <strong>new residential projects in Bavdhan Pune</strong> with hill-view apartments, double-glazed windows, and world-class amenities, Legend County represents the perfect investment. Discover the ultimate gated estate near <a href="/luxury-apartments-chandni-chowk">Chandni Chowk</a> for premium living in Pune West.'
    ]
  },
  'investment-flats-bavdhan-pune': {
    'content': [
      'Bavdhan has become the most profitable hub for <strong>real estate investment in Bavdhan Pune</strong>. With the completion of the multi-level Chandni Chowk flyover and the upcoming Pune Ring Road, values for <strong>properties in Bavdhan Pune</strong> are projected to appreciate significantly over the next few years.',
      'Investing in <strong>flats in Bavdhan Pune</strong> at Goel Ganga Legend County ensures long-term capital growth and high rental yields. Branded sports residences command a premium in the rental market, making it the best <strong>property investment in West Pune</strong> for both local and NRI buyers.',
      'With rental yields reaching 4.2% on our premium 3 BHK and 3.5 BHK configurations, Legend County outperforms standard developments in Pune. Secure your future by investing in a premium gated community that guarantees steady returns and excellent resale liquidity.'
    ]
  },
  'sports-township-pune': {
    'content': [
      'Goel Ganga Legend County is Pune\'s premier <strong>sports township Pune</strong>, offering an active lifestyle designed for champions. With over 12.5 acres dedicated solely to professional-grade sports infrastructure, we offer the most comprehensive <strong>sports residences in Pune</strong>.',
      'Residents have direct access to world-class training at the <a href="/michael-phelps-swimming-pune">Michael Phelps Swimming Academy Pune</a>, the South United Football Academy, and MS Dhoni\'s <a href="/tagda-raho-dhoni-pune">Tagda Raho</a> center. This unique fitness-first ecosystem is what makes our <strong>property in Bavdhan Pune</strong> stand out from the crowd.',
      'Our sports-themed <strong>gated community in Bavdhan Pune</strong> includes professional basketball courts, jogging tracks, tennis courts, and high-performance gyms. Live in a scenic, pollution-free environment that prioritizes your family\'s health and wellness.'
    ]
  },
  'luxury-apartments-chandni-chowk': {
    'content': [
      'If you are searching for <strong>luxury apartments near Chandni Chowk Pune</strong>, Goel Ganga Legend County offers the perfect residence. Located just 3 minutes from this critical highway junction, our homes provide unparalleled connectivity to Hinjewadi, Baner, and Kothrud.',
      'These premium <strong>flats near Chandni Chowk</strong> offer a peaceful escape from the city\'s noise, surrounded by the protected NDA forest lands. The strategic location makes it the preferred choice for corporate executives seeking <strong>apartments in Bavdhan Pune</strong> with easy highway access.',
      'With premium high-street shopping, international schools, and specialized hospitals located within a 5-minute radius, this is the most convenient residential zone in West Pune. Explore our hill-facing 3 BHK and 3.5 BHK configurations today.'
    ]
  },
  'michael-phelps-swimming-pune': {
    'content': [
      'Legend County is home to the world-renowned <strong>Michael Phelps Swimming Academy Pune</strong>, bringing elite aquatics training to West Pune. Residents have the exclusive privilege of professional swimming coaching inside the safety of their gated township.',
      'Our facility features a competition-sized, temperature-controlled swimming pool built to international standards. This Olympic-grade training is a key highlight of our <strong>sports township Pune</strong> and a major value driver for our <strong>luxury flats in Bavdhan</strong>.',
      'Whether you are training for competition or swimming for fitness, our certified coaches follow the Phelps Global Protocol. Experience a premium wellness lifestyle with access to top-tier sports amenities in Bavdhan.'
    ]
  },
  'tagda-raho-dhoni-pune': {
    'content': [
      'Unleash your functional power at MS Dhoni\'s <strong>Tagda Raho Dhoni Pune</strong> center, located exclusively within Goel Ganga Legend County. This revolutionary fitness protocol combines traditional Indian workout equipment with modern movement training.',
      'Train with Gada, Mudgar, and Vajra to build rotational strength and core stability. This is the first Tagda Raho center in West Pune, making our <strong>sports township Pune</strong> the ultimate destination for fitness enthusiasts seeking a premium lifestyle.',
      'As a resident of our <strong>luxury gated community in Bavdhan Pune</strong>, you get priority access and special member rates at this elite training center. Live in a home that supports your fitness goals every single day.'
    ]
  },
  '3.5-bhk-flats-bavdhan': {
    'content': [
      'Discover spacious living with our premium <strong>3.5 BHK flats in Bavdhan Pune</strong> at Goel Ganga Legend County. Designed for families who need flexible layouts, these luxury apartments feature an extra room that can serve as a home office, private study, or yoga studio.',
      'These elite <strong>3.5 BHK apartments in Bavdhan</strong> offer double-aspect balconies with panoramic views of the sports arena and the green NDA hills. The project\'s location is close to top-tier schools and hospitals, making it the best <a href="/schools-hospitals-near-bavdhan">property in Bavdhan Pune</a> for large families.',
      'Located near Chandni Chowk and NDA Road, our <strong>3.5 BHK in Bavdhan Pune</strong> combines quiet luxury with unmatched connectivity. Invest in a premium configuration that offers high resale value, premium finishes, and maximum spatial utility.'
    ]
  },
  'schools-hospitals-near-bavdhan': {
    'content': [
      'Living at Goel Ganga Legend County puts you at the center of the best educational and healthcare infrastructure in West Pune. Our <strong>luxury flats in Bavdhan Pune</strong> are surrounded by top-rated international schools and multi-specialty hospitals.',
      'Reputed schools like Ryan International School and MIT College are just a 5-10 minute drive away, making it ideal for families. Premium medical care is equally close, with Chellaram Hospital and Sahyadri Hospital providing world-class facilities nearby.',
      'With supermarkets, retail high-streets, and transit corridors located at your doorstep near Chandni Chowk, Bavdhan is the most self-sufficient suburb in West Pune. Invest in a location that ensures a convenient and secure family life.'
    ]
  },
  'rera-legal-compliance-bavdhan': {
    'content': [
      'Goel Ganga Legend County is a fully RERA-compliant and legally clear project in Bavdhan, Pune. Registered under MahaRERA number P52100054578, we ensure complete transparency and security for your real estate investment.',
      'The project is developed on title-clear land with all necessary sanctions from the PMRDA. Our 30-acre master plan is fully approved, ensuring that the 12.5-acre <a href="/sports-township-pune">sports township Pune</a> amenities are legally protected and delivered.',
      'Buyers can secure their dream home with absolute peace of mind, knowing that Goel Ganga Developments complies with all real estate regulations. Explore our legal documentation and RERA certificates today.'
    ]
  }
}

with open(silo_data_path, 'r') as f:
    code = f.read()

# Update the contents of each slug inside code
for slug, updates in enriched_data.items():
    # We find the block for the slug
    # Find matching block starts with: 'slug': {
    pattern = rf"'{slug}':\s*\{{(.*?)\n\s*\}},?\n"
    match = re.search(pattern, code, re.DOTALL)
    if match:
        block_content = match.group(1)
        # Now we replace the content block: content: [ ... ]
        content_pattern = r"content:\s*\[.*?\]"
        # Generate new content string
        new_content_list = []
        for c in updates['content']:
            # Escape single quotes and preserve formatting
            escaped_c = c.replace("'", "\\'")
            new_content_list.append(f"      '{escaped_c}'")
        new_content_str = "content: [\n" + ",\n".join(new_content_list) + "\n    ]"
        
        updated_block = re.sub(content_pattern, new_content_str, block_content, flags=re.DOTALL)
        code = code.replace(block_content, updated_block)

with open(silo_data_path, 'w') as f:
    f.write(code)

print("Enriched keywords successfully written to siloData.ts")
