# How to modify case studies?

1. First, open the [Strapi URL](https://sea-turtle-app-33ffu.ondigitalocean.app/admin) and login using **Super Admin** roles.
   ![Strapi login page](assets/q1-1.png)

2. If login successful, then Strapi dashboard page will appear.
   ![Strapi dashboard](assets/q1-2.png)

3. In the side panel menus, click **Content Manager** menu.
   ![UI Navigation](assets/q6-3.png)

4. In the **Collection Types Menu**, click **Case Study** under **Single Types**.
   ![Case study](assets/q6-4.png)

5. **Case study** will appear, then fill with the desired blog post.
   ![Case study, edit](assets/q6-5.png)

6. Click **Save** button at the top right screen, wait until success notification appear.
   ![Save case study](assets/q6-6.png)

7. Strapi will send webhooks to Netlify to re-build the code using updated data, this process takes time about 5 minutes less/more.

## Notes

- Don't forget to fill case studies for other languages.
