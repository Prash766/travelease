import { motion } from "framer-motion";

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 70, transition: { duration: 1 } },
    animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.section
      className="relative h-screen  flex items-center justify-center text-white "
   
    >
      <div
        className="absolute inset-0 bg-cover  bg-center z-0"
        style={{
          backgroundImage: `url('https://media.cntraveler.com/photos/5e260c21f19e560008df5148/master/pass/New-Zealand-adventure-GettyImages-585144798.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-5xl lg:text-7xl font-bold mb-4"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-xl mb-7"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Explore the world with TravelEase. Book flights, hotels, and
            experiences at unbeatable prices.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <button className="bg-white rounded-lg text-black hover:bg-indigo-100 text-lg px-8 py-3">
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
