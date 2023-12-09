import { Container } from 'react-bootstrap';
import PricingCard from '@/components/PricingCard';
import Footer from '@/components/Footer';

const studentPrices = () => {
  return (
    <div>
      <Container className="mb-5">
        <div>
          <h1 className="text-center mt-4">Student Prices</h1>

          <div className="d-flex flex-wrap justify-content-around align-items-center">
            <PricingCard
              title="Basic"
              price="FREE"
              description="Class of 20 and lower"
              features={['basic info 1', 'basic info 2', 'basic info 3']}
              height={'405px'}
            />

            <PricingCard
              title="Premium"
              price="$150"
              description="Class of 100 and lower"
              features={[
                'Premium Info 1',
                'Premium info 2',
                'Premium info 3',
                'Premium info 4',
              ]}
              height={'450px'}
            />

            <PricingCard
              title="Advanced"
              price="$100"
              description="Class of 50 and lower"
              features={[
                'advanced info 1',
                'advanced into 2',
                'advanced info 3',
              ]}
              height={'405px'}
            />
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default studentPrices;
