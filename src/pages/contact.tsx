import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Layout from "../components/Layout";
import { H1, BodyContentText } from "../components/Typography";

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string(),
});

const ContactPage: React.FC<PageProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });
  const [isSubmit, setIsSubmit] = React.useState(false);

  const sendMessage = (event: any) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setIsSubmit(true);
        reset();
      })
      .catch((error) => console.warn(error));
  };

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3">Contact us</H1>
        <div className="row">
          <div className="col-12 col-md-4">
            <BodyContentText classes="lh-lg">
              <span className="fw-bolder">Office location:</span>
              <br />
              105/166D Glebel Point Road
              <br />
              Glebel, 2037
              <br />
              Sydney, NSW, Australia.
              <br />
              <br />
              <span className="fw-bolder">Email:</span>
              <br />
              hello@videotranslator.ai
            </BodyContentText>
          </div>
          <div className="col-12 col-md-8">
            <form onSubmit={handleSubmit(sendMessage)}>
              <input type="hidden" name="form-name" value="contact" />
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Name"
                  {...register("name")}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors?.name?.message?.toString()}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors?.email?.message?.toString()}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <textarea
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Talk to us - what language would you like your content in? Can we help you in a different way?"
                  rows={5}
                  {...register("message")}
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">
                    {errors?.message?.message?.toString()}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-secondary mb-3">
                  Send
                </button>
              </div>
            </form>
            {isSubmit && (
              <div className="alert alert-primary" role="alert">
                Message successfully submitted!
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => <title>Contact Page</title>;
