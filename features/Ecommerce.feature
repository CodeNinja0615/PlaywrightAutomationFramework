Feature: Ecommerce validation
    @Regression
    Scenario: Placing the order
        Given A login to Ecommerce Application with "akhtarsameer743@gmail.com" and "Sameerking01!"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in cart
        When Enter valid details and place the order
        Then Verify order is present in order history page

    @Validation
    Scenario Outline: Placing the order
        Given A login to Ecommerce2 Application with "<username>" and "<password>"
        Then Verify Error mesaage is displayed

        Examples:
            | username          | password |
            | rahulshettyacadem | learning |
            | sameer akhtar     | kuchbhi  |