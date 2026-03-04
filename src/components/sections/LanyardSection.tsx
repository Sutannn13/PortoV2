import Lanyard from '@/components/reactbits/Lanyard';

const LanyardSection = () => {
    return (
        <section id="lanyard" className="relative z-10 w-full h-[600px] md:h-screen flex justify-center items-center">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />
        </section>
    );
};

export default LanyardSection;
