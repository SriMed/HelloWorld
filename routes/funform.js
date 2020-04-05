exports.home = function(req, res) {
    
    var render_dict = {
        message: "Enter the following information like a madlibs to get your future", 
        houses: [{"v": "gryff", "opt": "Gryffindor"}, {"v": "raven", "opt": "Ravenclaw"}, 
                {"v": "slyth", "opt": "Slytherin"}, {"v": "huffle", "opt": "Hufflepuff"}],
        zodiacs: [{"v": "0", "opt": "Aries"}, {"v": "1", "opt": "Taurus"}, 
                {"v": "2", "opt": "Gemini"}, {"v": "3", "opt": "Cancer"}, {"v": "4", "opt": "Leo"},
                {"v": "5", "opt": "Virgo"}, {"v": "6", "opt": "Libra"}, , {"v": "7", "opt": "Scorpio"},
                {"v": "8", "opt": "Sagittarius"}, {"v": "9", "opt": "Capricorn"}, , {"v": "10", "opt": "Aquarius"}, 
                {"v": "11", "opt": "Pisces"}]
    }
    
    res.render('funform', render_dict);
    
}

exports.predictFuture = function(req, res) {
    
    var name = req.query.name
    var house = req.query.house
    var zodiac = req.query.zodiac
    var ema = req.query.email
    
    var hf = {
        "gryff": " brave soul",
        "raven": " smart soul",
        "sltyh": " cunning, ambitious soul",
        "huffle": " hardworking soul"
    }
    
    var zf = {
        "0": "The Aries personality is impatient and opinionated, yet on the flip side, they are also strong, loving and kind.",
        "1": "Taurus is known for being reliable, practical and trustworthy. The Taurus personality is at one with nature and can adapt themselves to all sorts of environments. Taurus is a real mixture of traits because they love the appeal of security and stability yet live in a real material world. Sentimental, loyal, conservative, yet a little egocentric, Taurus is far from being one-dimensional and boring.",
        "2": "Gemini is known for their quick thinking and their expressive nature. Geminis are individuals animated by an intense curiosity that takes them to new and unchartered horizons. Gemini personality traits include being sympathetic, sociable, intelligent and adaptable in every type of situation. The third zodiac sign is perceptive and understanding of other people's ideas, but have a biased and narcissistic streak.",
        "3": "The Cancer personality is ultra-sensitive, gentle and kind. Cancer traits include being tender, intuitive and loving and their sweetness really helps this zodiac sign stand out from the rest. The Cancer zodiac sign needs to be surrounded, protected and made to feel safe at all times. Appearances can be misleading and there is lots more to this zodiac sign than being cute, they also have a tougher side to their personality. Discover the Cancer traits for complete astrology insights.",
        "4": "Leo is the natural leader of the zodiac and this star sign is definitely driven by their need to be loved, respected and admired. The Leo personality traits include being generous, warm, authoritative, demanding, and sometimes even uncompromising. A Leo loves to be the center of attention, but believe it or not can also be very self-conscious at times, especially in love.",
        "5": "Virgo is often very analytical and systematic; a real mixture of intelligence and logic. The Virgo personality loves studying, evaluating and methodically weighing up everything they do. Virgo is totally obsessed with perfection, which is why they pay such attention to detail and loves being the best! The Virgo zodiac sign is very intriguing yet fairly difficult to understand, especially when it comes to love.",
        "6": "The Libra personality is in constant search of peace, fairness and balance. Libra is kind, understanding and compassionate with everyone they meet. This zodiac sign craves partnership and hates being alone for long periods of time. Libra traits include a love of calm environments and a natural graciousness.",
        "7": "The Scorpio personality is one of the most complex and mysterious of all the zodiac signs. The fascinating Scorpio personality is like no other and is extremely decisive and emotive. Scorpio traits include being passionately expressive, intense and rebellious.",
        "8": "The Sagittarius personality is naturally enthusiastic, curious, fun loving, and energetic. There's no question about it, Sagittarius is one of the biggest wanderers of the zodiac and is on a constant quest for happiness. Sagittarius traits include being serene, optimistic, and adventurous. With their jovial and naïve nature, as well as their love for travel and exploration, Sagittarius has a tendency to head for the hills when drama arises.",
        "9": "Capricorn often adopts a defensive and skeptical attitude when they feel attacked. Capricorn traits include being attentive, brave, patient, and resistant. This zodiac sign is great at establishing practical relationships with others. When this zodiac sign fall in love, they often have a hard time opening up and trusting.",
        "10": "Aquarius is constantly in search of independence, so much so they often reject conventional lifestyles to pursue their own paths and ideas. The penultimate zodiac sign is a real chameleon thanks to their adaptability. Aquarius shines through thanks to their originality, curiosity and unpredictability.",
        "11": "The Pisces personality is very friendly and selfless, but can at times feel overwhelmed by whirlwinds of strong emotions. In short, Pisces is a creative, sensual, and imaginative person, who aspires to achieve total emotional and spiritual harmony; demonstrated daily through their generosity and caring. Get the horoscope insights you need on Pisces and build better relationships with them. "
    }
    
    var render_dict = {
        n: name,
        housefortune: "Welcome you" + hf[house],
        zodiacfortune: "According to your star sign, " + zf[zodiac],
        email: ema
    }
    
    res.render('madlibs', render_dict)
    
}