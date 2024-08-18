import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import FormFields from './interfaces/form';
import './App.css';

const App = () => {
  const [newlyFormIndex, setNewlyFormIndex] = useState<number | null>(null);
  const formsData = useSelector(
    (state: RootState) => state.formsData.formData as FormFields[] | undefined
  );

  const renderForms = () => {
    if (!formsData) {
      return null;
    }
    const renderPicture = (picture: File | FileList | string) => {
      if (typeof picture === 'string') {
        const isBaseUrl = picture.startsWith('data:image');

        return isBaseUrl ? (
          <img
            src={picture}
            style={{ width: '100px', height: 'auto' }}
            alt="Image"
          />
        ) : (
          <div>There is something wrong with the image!</div>
        );
      }

      return null;
    };

    return (
      <div className="forms">
        {formsData.map((form, index) => (
          <div
            key={index}
            className={`form ${index} ${newlyFormIndex} ${index === newlyFormIndex ? 'last' : ''}`}
          >
            <div className="form-item">Name: {form.name}</div>
            <div className="form-item">Age: {form.age}</div>
            <div className="form-item">Email: {form.email}</div>
            <div className="form-item">Gender: {form.gender}</div>
            {form.picture ? (
              <div className="form-item">
                Image: {renderPicture(form.picture)}
              </div>
            ) : null}
            <div className="form-item">Country: {form.country}</div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (formsData) {
      const lastIndex = formsData.length - 1;
      setNewlyFormIndex(lastIndex);

      const timer = setTimeout(() => {
        setNewlyFormIndex(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [formsData]);

  return (
    <>
      <h1 className="title">Forms</h1>
      <div className="forms-wrap">{formsData && renderForms()}</div>
    </>
  );
};

export default App;
