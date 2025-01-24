from django.core.mail import EmailMessage

from decouple import config


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data["subject"],
            body=data["body"],
            from_email=config("EMAIL_FROM"),
            to=[data["to_email"]],
        )
        email.send()


def send_registration_email(user, password):
    subject = "Welcome to Our Platform!"
    message = (
        f"Hi {user.name},\n\n"
        f"Thank you for registering on our platform.\n"
        f"Here are your details:\n\n"
        f"Name: {user.name}\n"
        f"Email / User ID: {user.email}\n"
        f"Password: {password}\n\n"
        f"Please keep your credentials secure.\n\n"
        f"Best regards,\n"
        f"CCTV Services"
    )
    data = {
        "subject": subject,
        "body": message,
        "to_email": user.email,
    }

    try:
        Util.send_email(data)
    except Exception as e:
        print(f"Failed to send email: {e}")