import React from "react";
import ReactMarkdown from "react-markdown";

const FaqItem = ({ node: { id, Question, Answer } }: any) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#faq-${id}`}
          aria-expanded="false"
          aria-controls={id}
        >
          {Question}
        </button>
      </h2>
      <div
        id={`faq-${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`label-${id}`}
        data-bs-parent="#faqs"
      >
        <div className="accordion-body">
          <ReactMarkdown>{Answer?.data?.Answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
