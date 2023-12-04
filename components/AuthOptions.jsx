import Link from 'next/link';

const AuthOptions = ({ authOption }) => {
  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <div style={{ width: '350px' }}>
          <div className="d-flex justify-content-center">
            <div className="w-100">
              <Link
                href={`/student${authOption}`}
                className="mb-4 w-100 btn btn-lg auth-btns "
                style={{ color: 'white' }}
              >
                {authOption} as a student
              </Link>

              <Link
                href={`/educator${authOption}`}
                className="mb-4 w-100 btn btn-lg auth-btns "
                style={{ color: 'white' }}
              >
                {authOption} as an educator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthOptions;
