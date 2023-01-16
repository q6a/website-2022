# How to create a new page?

1. First, open the [Strapi URL](https://sea-turtle-app-33ffu.ondigitalocean.app/admin) and login using **Super Admin** roles.
   ![Strapi login page](assets/q1-1.png)

2. If login successful, then Strapi dashboard page will appear.
   ![Strapi dashboard](assets/q1-2.png)

3. In the side panel menus, click **Content Manager** menu.
   ![Content manager](assets/q1-3.png)

4. In the **Collection Types**, click **Custom Pages**.
   ![Custom pages](assets/q1-4.png)

5. List of **Custom Pages** will appear, then click **Create new entry** button at the top right screen.
   ![Custom pages, new entry](assets/q1-5.png)

6. Fill all the required fields. Please make sure the `slug` field must be unique.
   ![Fill all required fields](assets/q1-6.png)

7. Click **Save** button at the top right screen, wait until success notification appear.
   ![Save new custom page](assets/q1-7.png)

8. Don't forget to click **Publish** button to publish the page.
   ![Publish custom page](assets/q1-8.png)

9. After **Publish** button has been clicked, Strapi will send webhooks to Netlify to re-build the code using updated data, this process takes time about 5 minutes less/more.

10. Access the new page via `https://q6a-website-dev.netlify.app/page/<slug>`. Example: if you fill the `slug` name with `about`, then the new page will be `https://q6a-website-dev.netlify.app/page/about`.

## Notes

- `slug` field must be unique.
- `align` field related to align of title text in the page
- `content` field using markdown format, please have a look the [basic syntax](https://www.markdownguide.org/basic-syntax/)
