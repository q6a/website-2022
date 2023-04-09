# How to modify partner/client logos?

1. First, open the [Strapi URL](https://sea-turtle-app-33ffu.ondigitalocean.app/admin) and login using **Super Admin** roles.
   ![Strapi login page](assets/q1-1.png)

2. If login successful, then Strapi dashboard page will appear.
   ![Strapi dashboard](assets/q1-2.png)

3. In the side panel menus, click **Content Manager** menu.
   ![UI Navigation](assets/q4-3.png)

4. In the **Collection Types**, click **Partner Logo** under **Single Types**.
   ![Custom pages](assets/q4-4.png)

5. **Partner Logo** will appear, then click **+** icon button below of logo images input.
   ![Custom pages, new entry](assets/q4-5.png)

6. Click **Save** button at the top right screen, wait until success notification appear.
   ![Save partner logo](assets/q4-6.png)

7. Strapi will send webhooks to Netlify to re-build the code using updated data, this process takes time about 5 minutes less/more.

## Notes

- Logos order can configured by **dragging** images inside the popup below
  ![Logos order](assets/q4-5.png)
