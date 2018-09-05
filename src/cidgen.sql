-- UDF FOR MYSQL

drop function if exists FN_CIDGEN;
delimiter //

create function FN_CIDGEN() RETURNS CHAR(12) NOT DETERMINISTIC
BEGIN

SET @VALID_CHARS = 'TNLDPHGFYWKVXZJQ';
SET @CID_LENGTH_WITHOUT_PREFIX = 11;

SET @cid = 'C';
SET @counter = @CID_LENGTH_WITHOUT_PREFIX;
SET @randNumber = 0;
SET @available_chars = @VALID_CHARS;

WHILE @counter >0 do

	SET @randNumber = floor( rand() * length(@available_chars) );
    SET @thischar = substring(@available_chars, @randNumber+1, 1);
	SET @cid = concat(@cid, @thischar);
	SET @available_chars = REPLACE( @available_chars,@thischar, '' );

	SET @counter = @counter -1;
END WHILE;

RETURN @cid;
END //
delimiter ;