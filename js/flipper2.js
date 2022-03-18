//  <script src="jquery-1.4.2.min.js" type="text/javascript"></script>
//  <script type="text/javascript">
        $(document).ready(function () {
            setTimeFor2Hide();
        });

        function setTimeFor1Hide() {
            setTimeout("$('#ptag1').fadeIn(500)", 1200);
            setTimeout("$('#ptag2').fadeOut(500)", 700);
            setTimeout("setTimeFor2Hide();", 1000);
        }

        function setTimeFor2Hide() {
            setTimeout("$('#ptag1').fadeOut(500)", 700);
            setTimeout("$('#ptag2').fadeIn(500)", 1200);
            setTimeout("setTimeFor1Hide();", 1000);
        }
    </script>