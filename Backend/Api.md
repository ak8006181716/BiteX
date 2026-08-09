# working APIS

# API                                      Status
Get My Cart	                             - Done
Add Item to Cart	                     - Working
Update Cart Item Quantity                - Pending
Remove Item from Cart	                 - Pending
Clear Cart	                             - Pending 
Get Cart Total	                         - Pending


🏪 Restaurant APIs ✅
#	API                             Who can use it	            Purpose
1	Create Restaurant	            Restaurant Owner	        Register/create their restaurant
2	Get Restaurant By ID	        Public	                    View restaurant details
3	Get All Restaurants	            Public	                    Restaurant listing/search
4	Update Restaurant	            Restaurant Owner	        Update name, description, image, location, etc.
5	Delete/Deactivate Restaurant    Restaurant Owner	        Soft-delete/deactivate restaurant
6	Get My Restaurant	            Restaurant Owner	        Get the logged-in owner's restaurant
7	Change Restaurant Status	    Restaurant Owner	        Open/close restaurant
8	Get Restaurant Menu	            Public	                    Get all menu items for a restaurant



🛒 Cart APIs -- Working 
#	API	                            Purpose
1	Get My Cart	                    Get the logged-in user's current cart
2	Add Item to Cart	            Add a menu/dish item
3	Update Cart Item Quantity	    Increase/decrease quantity
4	Remove Item from Cart	        Remove one item
5	Clear Cart	                    Remove everything from cart
6	Get Cart Total	                Calculate/display subtotal, fees, etc.


🎟️ Coupon APIs
#	API	                            Who	                        Purpose
1	Create Coupon	                Admin	                    Create a new coupon
2	Get All Coupons	                Admin	                    Manage/list coupons
3	Get Coupon By ID	            Admin	                    View one coupon
4	Update Coupon	                Admin	                    Change discount, expiry, limits, etc.
5	Deactivate/Delete Coupon	    Admin	                    Disable a coupon
6	Apply/Validate Coupon	        Customer	                Check whether coupon can be used


📦 Order APIs
#	API	                            Who can use it	            Purpose
1	Create Order	                Customer	                Create an order from the customer's cart
2	Get My Orders	                Customer	                Get the logged-in customer's order history
3	Get My Order	                Customer	                Get details of a specific order
4	Cancel Order	                Customer	                Cancel an order if cancellation is allowed
5	Restaurant Get Orders	        Restaurant Owner	        Get orders placed for their restaurant
6	Restaurant Accept Order	        Restaurant Owner	        Accept a customer's order
7	Restaurant Reject Order	        Restaurant Owner	        Reject an order the restaurant cannot fulfill
8	Restaurant Mark Ready	        Restaurant Owner	        Mark the order as ready for pickup
9	Delivery Get Available Orders	Delivery Partner	        Get orders available for delivery
10	Delivery Accept Order	        Delivery Partner	        Accept an available delivery order
11	Delivery Mark Picked Up	        Delivery Partner	        Mark the order as picked up from the restaurant
12	Delivery Mark Delivered	        Delivery Partner	        Mark the order as delivered
13	Admin Get All Orders	        Admin	                    Get all orders in the system
14	Admin Get Order	                Admin	                    Get details of any specific order



💳 Payment APIs
#	API	                            Who can use it	            Purpose
1	Create Payment	                Customer	                Initiate payment for an order
2	Verify Payment	                Customer/System	Verify that the payment was successfully completed
3	Get My Payments	                Customer	                Get the logged-in customer's payment history
4	Get Payment By Order	        Customer	                Get payment details for a specific order
5	Refund Payment	                Admin	                    Refund a payment when an order is cancelled/refunded
6	Get All Payments	            Admin	                    View all payments in the system
7	Get Payment By ID	            Admin	                    View details of a specific payment



🛵 Delivery APIs
#	API	                            Who can use it	            Purpose
1	Register Delivery Partner	    Delivery Partner	        Register as a delivery partner
2	Get My Delivery Profile	        Delivery Partner	        Get the logged-in delivery partner's profile
3	Update Delivery Profile	        Delivery Partner	        Update delivery partner information
4	Change Availability Status	    Delivery Partner	        Mark themselves available/unavailable for deliveries
5	Get Available Deliveries	    Delivery Partner	        Get orders available for delivery
6	Accept Delivery	                Delivery Partner	        Accept a delivery
7	Get My Deliveries	            Delivery Partner	        Get delivery history/current deliveries
8	Get Delivery By Order	        Delivery Partner	        Get delivery information for a specific order
9	Update Delivery Status	        Delivery Partner	        Update pickup/out-for-delivery/delivered status
10	Get All Delivery Partners	    Admin	                    View all delivery partners
11	Update Delivery Partner Status	Admin	                    Activate/deactivate a delivery partner



⭐ Review APIs
#	API	                            Who can use it	            Purpose
1	Create Review	                Customer	                Review a restaurant/order after delivery
2	Get Restaurant Reviews	        Public	                    View reviews for a restaurant
3	Get My Reviews	                Customer	                View reviews created by the logged-in user
4	Update Review	                Customer	                Edit their own review
5	Delete Review	                Customer	                Delete their own review
6	Delete Review	                Admin	                    Remove inappropriate reviews



🔔 Notification APIs
#	API	                            Who can use it	            Purpose
1	Get My Notifications	        Authenticated User	        Get user's notifications
2	Get Notification By ID	        Authenticated User	        View a specific notification
3	Mark Notification As Read	    Authenticated User	        Mark one notification as read
4	Mark All Notifications As Read	Authenticated User	        Mark all notifications as read
5	Delete Notification	            Authenticated User	        Delete a notification
6	Send Notification	            System/Admin	            Send a notification to a user



💬 Chat APIs
#	API	                            Who can use it	            Purpose
1	Create Chat	                    Customer/Delivery Partner	Start a conversation
2	Get My Chats	                Authenticated User	        Get user's conversations
3	Get Chat By ID	                Chat Participants	        Get a specific conversation
4	Send Message	                Chat Participants	        Send a message
5	Get Chat Messages	            Chat Participants	        Get messages from a conversation
6	Mark Messages As Read	        Chat Participants	        Mark messages as read
7	Delete Message	                Message Sender/Admin	    Delete a message