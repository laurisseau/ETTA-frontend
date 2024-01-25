import Swal from 'sweetalert2';

export const getError = (error) => {
  return error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const correctManicoLanguage = (editorLanguage) => {
  const languageMappings = {
    python3: 'python',
    nodejs: 'javascript',
    java: 'java',
  };

  return languageMappings[editorLanguage] || null;
};

export const courseAccess = (userSubscription, courseSubscription, courseSlug, courseId) => {
  let hasAccess = false;

  switch (userSubscription) {
    case 'Basic':
      hasAccess = courseSubscription === 'Basic';
      break;

    case 'Advanced':
      hasAccess =
        courseSubscription === 'Basic' || courseSubscription === 'Advanced';
      break;

    case 'Premium':
      hasAccess =
        courseSubscription === 'Basic' ||
        courseSubscription === 'Advanced' ||
        courseSubscription === 'Premium';
      break;

    default:
      Swal.fire('Your class subscription does not cover this course');
      return;
  }

  if (hasAccess) {
    window.location.href = `/lesson/${courseSlug}/${courseId}`;
  } else {
    Swal.fire('Your class subscription does not cover this course');
  }
};

// direct to correct page function