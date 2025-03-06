Feature: Ecommerce validation

    @Validation
    Scenario Outline: Placing the order
        Given A login to Ecommerce2 Application with "<username>" and "<password>"
        Then Verify Error mesaage is displayed

        Examples:
            | username          | password |
            | rahulshettyacadem | learning |
            | sameer akhtar     | kuchbhi  |